'use server'

import z from 'zod'
import { ServerError } from '@/lib/errors'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressDTO } from '@/schemas/address'
import { OrderItemDTO } from '@/schemas/order'

export const placeOrder = safeAuthClient
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
          throw new ServerError('Producto no encontrado')
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
          throw new ServerError('Producto sin existencias')
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
          throw new ServerError(`${p.title} no tiene inventario suficiente`)
        }
      })

      const { id } = await tx.order.create({
        data: {
          userId,
          tax,
          total,
          subtotal,
          totalItems,
          items: {
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

export const getOrderById = safeAuthClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const order = await prisma.order.findUnique({
      where: {
        id: parsedInput.id,
        userId: ctx.user.id,
      },
      include: {
        shippingAddress: true,
        items: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                id: true,
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
      omit: {
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        paidAt: true,
      },
    })

    if (!order) {
      throw new ServerError('Orden no encontrada')
    }

    return order
  })

export const getMyOrders = safeAuthClient.action(async ({ ctx }) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: ctx.user.id,
    },
    include: {
      shippingAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    omit: {
      userId: true,
      total: true,
      subtotal: true,
      tax: true,
      totalItems: true,
      createdAt: true,
      updatedAt: true,
      paidAt: true,
    },
  })

  return orders
})
