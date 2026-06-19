import type { Metadata } from 'next'
import { mainFont, titleFont } from '@/fonts'
import { Providers } from './providers'
import '@/app/globals.css'

export const metadata: Metadata = {
  applicationName: 'Teslo Shop',
  title: { template: '%s - Teslo | Shop', default: 'Inicio - Teslo | Shop' },
  description: 'Una tienda virtual de ropa creada con Create Next App',
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'E-commerce'],
  authors: { name: 'Esteban V.M.', url: 'https://github.com/esteban-vm' },
  creator: 'Esteban V.M.',
  publisher: 'Esteban V.M.',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'overlays-content',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      className={`${mainFont.variable} ${titleFont.variable} bg-base-200 antialiased`}
      lang='es'
      suppressHydrationWarning
    >
      <body className='bg-linear-to-t from-base-200 to-base-100 font-geist'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
