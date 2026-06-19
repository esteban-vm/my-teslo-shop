import type { ThemeTypeWithDefault } from 'rsc-daisyui'
import type { Gender } from '@/prisma/generated/client'

// UI
export const DRAWER_ID = 'app_drawer'

// Pagination
export const ELLIPSIS_CHAR = '…'

// Gender Map
export const genderMap: Record<Gender, string> = {
  men: 'hombres',
  women: 'mujeres',
  kids: 'niños',
  unisex: 'todos',
}

// App Themes
export const appThemes = ['wireframe', 'night'] as const satisfies ThemeTypeWithDefault[]

// Theme map
export const themeMap: Record<'light' | 'dark', (typeof appThemes)[number]> = {
  light: 'wireframe',
  dark: 'night',
}
