'use server'

import z from 'zod'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { authClient } from '@/lib/safe-action'
import { AddressDTO } from '@/schemas/address'
import { OrderItemDTO } from '@/schemas/order'

export const placeOrder = authClient
  .inputSchema(z.object({ items: z.array(OrderItemDTO), address: AddressDTO }))
  .action(async ({ ctx, parsedInput }) => {
    await sleepExecution(3)
    const userId = ctx.user.id
    const { items, address } = parsedInput

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: items.map((i) => i.productId),
        },
      },
    })

    const totalItems = items.reduce((total, i) => total + i.quantity, 0)

    const { total, subtotal, tax } = items.reduce(
      (acc, i) => {
        const product = products.find((p) => p.id === i.productId)

        if (!product) {
          throw new Error('Producto no encontrado')
        }

        const subtotal = product.price * i.quantity
        acc.subtotal += subtotal
        acc.tax += subtotal * 0.15
        acc.total += subtotal * 1.15

        return acc
      },
      { total: 0, subtotal: 0, tax: 0 }
    )

    const orderId = await prisma.$transaction(async (tx) => {
      const productsPromises = products.map((p) => {
        const quantity = items.filter((i) => i.productId === p.id).reduce((acc, i) => i.quantity + acc, 0)

        if (quantity === 0) {
          throw new Error('Sin existencias para este producto')
        }

        return tx.product.update({
          where: { id: p.id },
          data: {
            stock: {
              decrement: quantity,
            },
          },
        })
      })

      const updatedProducts = await Promise.all(productsPromises)

      updatedProducts.forEach((p) => {
        if (p.stock < 0) {
          throw new Error(`${p.title} no tiene inventario suficiente`)
        }
      })

      const { id } = await tx.order.create({
        data: {
          userId,
          total,
          subtotal,
          tax,
          totalItems,
          orderItems: {
            createMany: {
              data: items.map((i) => {
                return {
                  ...i,
                  price: products.find((p) => p.id === i.productId)?.price ?? 0,
                }
              }),
            },
          },
        },
        select: { id: true },
      })

      const { remember: _, ...rest } = address
      await tx.shippingAddress.create({ data: { ...rest, orderId: id } })
      return id
    })

    return { orderId }
  })

export const getOrderById = authClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.user.id
    const isAdmin = ctx.user.role === 'admin'

    const order = await prisma.order.findUnique({
      where: {
        id: parsedInput.id,
        userId: isAdmin ? undefined : userId,
      },
      include: {
        shippingAddress: true,
        orderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    })

    if (!order) {
      throw new Error('Orden no encontrada')
    }

    return order
  })
