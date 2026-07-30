'use client'

import type { ReactNode } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        environment: 'sandbox',
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
      }}
    >
      {children}
    </PayPalScriptProvider>
  )
}
