'use client'

import type { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { appThemes, themeMap } from '@/lib/constants'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      enableSystem
      storageKey='teslo-shop/current-theme'
      themes={appThemes}
      value={themeMap}
    >
      <SessionProvider>
        {children}
        <ToastContainer pauseOnHover={false} position='bottom-center' theme='colored' />
      </SessionProvider>
    </ThemeProvider>
  )
}
