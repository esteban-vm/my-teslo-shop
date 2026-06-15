import type { Metadata } from 'next'
import tw from 'tailwind-styled-components'
import { ToastProvider } from '@/components/providers'
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
    <html className={`${mainFont.variable} ${titleFont.variable} bg-base-200 antialiased`} lang='es'>
      <PageContainer>
        <ToastProvider>{children}</ToastProvider>
      </PageContainer>
    </html>
  )
}

const PageContainer = tw.body`bg-linear-to-t from-base-200 to-base-100 font-geist`
