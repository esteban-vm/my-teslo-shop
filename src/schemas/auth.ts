import { z } from 'zod'
import { ValidationErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'
import { notEmpty } from './shared'

export const LoginDTO = z.object({
  email: notEmpty.superRefine((value, ctx) => {
    if (Validations.notEmail(value)) {
      ctx.addIssue(ValidationErrorMap.notEmail)
    }
  }),

  password: notEmpty,
})

export const NewUserDTO = LoginDTO.extend({
  name: notEmpty,

  password: notEmpty.superRefine((value, ctx) => {
    if (Validations.notPassword(value)) {
      ctx.addIssue(ValidationErrorMap.notPassword)
    }
  }),

  repeatPassword: notEmpty,
}).refine((value) => value.password === value.repeatPassword, {
  path: ['repeatPassword'],
  error: 'Las contraseñas deben coincidir',
})

export type LoginDTO = z.infer<typeof LoginDTO>
export type NewUserDTO = z.infer<typeof NewUserDTO>
