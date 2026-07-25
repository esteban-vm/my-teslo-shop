import type { ThemeTypeWithDefault as Theme } from 'rsc-daisyui'
import type { Gender, Role } from '@/prisma/generated/client'

// UI
export const DRAWER_ID = 'app_drawer'

// Pagination
export const ELLIPSIS_CHAR = '…'

// Genders
export const GenderMap: Record<Gender, string> = {
  men: 'hombres',
  women: 'mujeres',
  kids: 'niños',
  unisex: 'todos',
}

// Themes
export const themes = ['light', 'dark'] as const satisfies string[]

// Theme values
export const ThemeMap = {
  light: 'wireframe',
  dark: 'night',
} as const satisfies Record<(typeof themes)[number], Theme>

// Api errors
export const ApiErrorMap = {
  invalidEmailOrPassword: 'Correo electrónico y/o contraseña inválido(s)',
  unverifiedEmail: 'Correo electrónico no verificado',
  emailAlreadyInUse: 'El correo electrónico ya está en uso',
} as const

// User roles
export const userRoles = ['user', 'admin'] as const satisfies [Role, Role]
