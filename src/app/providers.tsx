'use client'

import type { ReactNode } from 'react'
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
      {/* <PayPalScriptProvider
        options={{
          environment: 'sandbox',
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        }}
      > */}
      {children}
      {/* </PayPalScriptProvider> */}
      <ToastContainer draggable={false} pauseOnHover={false} position='bottom-center' theme='colored' />
    </ThemeProvider>
  )
}
