'use client'

import { PayPalOneTimePaymentButton } from '@paypal/react-paypal-js/sdk-v6'

export function PaymentButton() {
  return <PayPalOneTimePaymentButton className='w-full' onApprove={async () => {}} orderId='' />
}
