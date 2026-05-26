import type { Metadata } from 'next'
import { mainFont, titleFont } from '@/fonts'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Inicio - Teslo | Shop',
  },
  description: 'Una tienda virtual de ropa',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={`${mainFont.variable} ${titleFont.variable} h-screen min-h-192 antialiased`} lang='es'>
      <body className='h-fit bg-linear-to-t from-base-200 to-base-100 font-geist'>{children}</body>
    </html>
  )
}
