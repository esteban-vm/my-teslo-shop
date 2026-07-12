'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { ServerError } from '@/lib/errors'
import { getToken, verifyPayment } from '@/lib/payments'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { WithID } from '@/schemas/shared'

export const checkPayment = safeAuthClient.inputSchema(WithID).action(async ({ parsedInput }) => {
  const payPalToken = await getToken()
  console.log({ payPalToken })

  if (!payPalToken) {
    throw new ServerError('No se pudo encontrar token de verificación')
  }

  const statusResponse = await verifyPayment(parsedInput.id, payPalToken)

  if (!statusResponse) {
    throw new ServerError('Error al verificar el pago')
  }

  const { status, purchase_units } = statusResponse
  console.log({ status, purchase_units })

  if (status !== 'COMPLETED') {
    throw new ServerError('Aún no se ha pagado en PayPal')
  }

  const [{ invoice_id: orderId }] = purchase_units

  await prisma.order.update({
    where: { id: orderId },
    data: {
      isPaid: true,
      paidAt: new Date(),
    },
  })

  revalidatePath(`/orders/${orderId}` satisfies Route<`/orders/${string}`>)
})
