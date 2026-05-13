import type { Metadata } from 'next'
import { mainFont } from '@/fonts'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Teslo | Shop',
  description: 'Una tienda virtual de ropa',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={`${mainFont.variable} h-screen min-h-192 bg-base-200 antialiased`} lang='es'>
      <body>{children}</body>
    </html>
  )
}
