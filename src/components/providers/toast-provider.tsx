'use client'

import type { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer pauseOnHover={false} position='bottom-center' theme='colored' />
    </>
  )
}
