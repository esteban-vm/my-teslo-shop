import type { ReactNode } from 'react'
import { ThemeProvider } from '@teispace/next-themes'
import { getTheme } from '@teispace/next-themes/server'
import { ToastContainer } from 'react-toastify'
import { ThemeMap, themes } from '@/lib/constants'

export async function Providers({ children }: { children: ReactNode }) {
  const initialTheme = await getTheme()

  return (
    <ThemeProvider
      defaultTheme={themes[1]}
      disableTransitionOnChange
      initialTheme={initialTheme ?? undefined}
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
