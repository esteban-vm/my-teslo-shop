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
export const themeMap = {
  light: 'wireframe',
  dark: 'night',
} as const satisfies Record<'light' | 'dark', (typeof appThemes)[number]>
