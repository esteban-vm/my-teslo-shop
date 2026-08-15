'use server'

import { ServerError } from '@/lib/errors'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { PlaceOrder } from '@/schemas/order'

export const placeOrder = safeAuthClient.inputSchema(PlaceOrder).action(async ({ ctx, parsedInput }) => {
  await sleep(3)
  const { items, address } = parsedInput

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((item) => item.productId) } },
  })

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const { total, subtotal, tax } = items.reduce(
    (summary, item) => {
      const product = products.find((product) => product.id === item.productId)

      if (!product) {
        throw new ServerError('Producto no encontrado')
      }

      const subtotal = product.price * item.quantity
      summary.subtotal += subtotal
      summary.tax += subtotal * 0.15
      summary.total += subtotal * 1.15

      return summary
    },
    { total: 0, subtotal: 0, tax: 0 }
  )

  const orderId = await prisma.$transaction(async (tx) => {
    const productsPromises = products.map((product) => {
      const quantity = items.filter((item) => item.productId === product.id).reduce((q, i) => i.quantity + q, 0)

      if (quantity === 0) {
        throw new ServerError('Producto sin existencias')
      }

      return tx.product.update({
        where: { id: product.id },
        data: { stock: { decrement: quantity } },
      })
    })

    const updatedProducts = await Promise.all(productsPromises)

    updatedProducts.forEach((product) => {
      if (product.stock < 0) {
        throw new ServerError(`${product.title} no tiene inventario suficiente`)
      }
    })

    const { id: orderId } = await tx.order.create({
      data: {
        userId: ctx.auth.user.id,
        tax,
        total,
        subtotal,
        totalItems,
        items: {
          createMany: {
            data: items.map((item) => {
              return {
                ...item,
                price: products.find((product) => product.id === item.productId)?.price ?? 0,
              }
            }),
          },
        },
      },
      select: { id: true },
    })

    const { remember: _, ...rest } = address
    await tx.shippingAddress.create({ data: { ...rest, orderId } })
    return orderId
  })

  return { orderId }
})
