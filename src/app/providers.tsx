'use client'

import type { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer pauseOnHover={false} position='bottom-center' theme='colored' />
    </SessionProvider>
  )
}
