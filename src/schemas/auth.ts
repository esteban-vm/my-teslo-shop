import { z } from 'zod'
import { ErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'
import { notEmpty } from './shared'

export const Login = z.object({
  email: notEmpty.superRefine((value, ctx) => {
    if (Validations.notEmail(value)) {
      ctx.addIssue(ErrorMap.notEmail)
    }
  }),

  password: notEmpty,
})

export const UserDTO = Login.extend({
  name: notEmpty,

  password: notEmpty.superRefine((value, ctx) => {
    if (Validations.notPassword(value)) {
      ctx.addIssue(ErrorMap.notPassword)
    }
  }),

  repeatPassword: notEmpty,
}).refine((value) => value.password === value.repeatPassword, {
  path: ['repeatPassword'],
  error: 'Las contraseñas deben coincidir',
})

export type Login = z.infer<typeof Login>
export type UserDTO = z.infer<typeof UserDTO>
