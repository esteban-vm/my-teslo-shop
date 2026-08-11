import type { ThemeTypeWithDefault as Theme } from 'rsc-daisyui'
import type { Gender, Role } from '@/prisma/generated/enums'

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
export const THEMES = ['light', 'dark'] as const satisfies string[]

// Theme values
export const ThemeMap = {
  light: 'wireframe',
  dark: 'night',
} as const satisfies Record<(typeof THEMES)[number], Theme>

// Api errors
export const ApiErrorMap = {
  invalidEmailOrPassword: 'Correo electrónico y/o contraseña inválido(s)',
  unverifiedEmail: 'Correo electrónico no verificado',
  emailAlreadyInUse: 'El correo electrónico ya está en uso',
} as const

// User roles
export const USER_ROLES = ['user', 'admin'] as const satisfies [Role, Role]

// Image uploads
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/avif']
