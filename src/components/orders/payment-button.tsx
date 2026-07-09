'use client'

import type { PayPalButtonCreateOrder, PayPalButtonOnApprove } from '@paypal/paypal-js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Skeleton } from 'rsc-daisyui'
import { checkPayment, setTransactionId } from '@/actions/order'

export interface PaymentButtonProps {
  orderId: string
  amount: number
}

export function PaymentButton({ orderId, amount }: PaymentButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer()
  const roundedAmount = Math.round(amount * 100) / 100

  if (isPending) {
    return <Skeleton text>Cargando PayPal</Skeleton>
  }

  const onCreateOrder: PayPalButtonCreateOrder = async (_, actions) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: roundedAmount.toString(),
          },
        },
      ],
      intent: 'CAPTURE',
    })

    await setTransactionId({ orderId, transactionId })
    return transactionId
  }

  const onApproveOrder: PayPalButtonOnApprove = async (_, actions) => {
    const details = await actions.order?.capture()
    if (!details?.id) return
    await checkPayment({ id: details.id })
  }

  return <PayPalButtons className='z-10' createOrder={onCreateOrder} onApprove={onApproveOrder} />
}
