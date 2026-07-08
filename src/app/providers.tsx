'use client'

import type { ReactNode } from 'react'
import { PayPalProvider } from '@paypal/react-paypal-js/sdk-v6'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { ThemeMap, themes } from '@/lib/constants'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      enableSystem
      storageKey='teslo-shop/current-theme'
      themes={themes}
      value={ThemeMap}
    >
      <PayPalProvider
        clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
        components={['paypal-payments', 'card-fields']}
        environment='sandbox'
        pageType='checkout'
      >
        {children}
      </PayPalProvider>
      <ToastContainer draggable={false} pauseOnHover={false} position='bottom-center' theme='colored' />
    </ThemeProvider>
  )
}
