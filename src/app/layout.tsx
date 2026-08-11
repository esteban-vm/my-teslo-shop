import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@teispace/next-themes'
import { getTheme, getThemeScript } from '@teispace/next-themes/server'
import { ToastContainer } from 'react-toastify'
import { THEMES, ThemeMap } from '@/lib/constants'
import { mainFont, titleFont } from '@/lib/fonts'
import './globals.css'

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

export type Props = LayoutProps<'/'>

export default async function Layout({ children }: Props) {
  const initialTheme = (await getTheme()) ?? undefined
  const themeScript = getThemeScript({ attribute: 'data-theme', initialTheme })

  return (
    <html
      className={`${mainFont.variable} ${titleFont.variable} bg-base-200 antialiased`}
      lang='es'
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: anti-FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className='bg-linear-to-t from-base-200 to-base-100 font-geist'>
        <ThemeProvider
          defaultTheme={THEMES[1]}
          disableTransitionOnChange
          initialTheme={initialTheme}
          themes={THEMES}
          value={ThemeMap}
        >
          {children}
          <ToastContainer draggable={false} pauseOnHover={false} position='bottom-center' theme='colored' />
        </ThemeProvider>
      </body>
    </html>
  )
}
