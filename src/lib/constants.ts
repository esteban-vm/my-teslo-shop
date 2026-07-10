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
export const themes = ['wireframe', 'night'] as const satisfies [Theme, Theme]

// Theme values
export const ThemeMap = {
  light: 'wireframe',
  dark: 'night',
} as const satisfies Record<'light' | 'dark', (typeof themes)[number]>

// Validation errors
export const ValidationErrorMap = {
  notEmpty: {
    error: 'Este campo no puede quedar vacío',
  },

  notEmail: {
    code: 'custom',
    message: 'El correo electrónico debe ser válido',
  },

  notPassword: {
    code: 'custom',
    message: `La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo`,
  },
} as const

// Api errors
export const ApiErrorMap = {
  invalidEmailOrPassword: 'Correo electrónico y/o contraseña inválido(s)',
  unverifiedEmail: 'Correo electrónico no verificado',
  emailAlreadyInUse: 'El correo electrónico ya está en uso',
} as const

// User roles
export const userRoles = ['user', 'admin'] as const satisfies [Role, Role]
