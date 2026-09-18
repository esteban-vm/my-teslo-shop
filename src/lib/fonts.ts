import localFont from 'next/font/local'

export const Geist = localFont({
  src: '../../public/fonts/geist-variable.woff2',
  variable: '--font-geist-variable',
})

export const Montserrat = localFont({
  variable: '--font-montserrat-alternates',
  src: [
    { path: '../../public/fonts/montserrat-alternates-regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/montserrat-alternates-semibold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/montserrat-alternates-bold.woff2', weight: '700', style: 'normal' },
  ],
})
