import localFont from 'next/font/local'

export const mainFont = localFont({
  src: '../../public/fonts/geist-variable.ttf',
  variable: '--font-geist-variable',
})

export const titleFont = localFont({
  variable: '--font-montserrat-alternates',
  src: [
    { path: '../../public/fonts/montserrat-alternates-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/montserrat-alternates-semibold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/montserrat-alternates-bold.ttf', weight: '700', style: 'normal' },
  ],
})
