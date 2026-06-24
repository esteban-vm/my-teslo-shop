import { z } from 'zod'
import { ErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'

const notEmpty = z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty)

const Email = z.object({
  email: notEmpty.superRefine((value, ctx) => {
    if (Validations.notEmail(value)) {
      ctx.addIssue(ErrorMap.notEmail)
    }
  }),
})

export const Login = Email.extend({ password: notEmpty })

export const NewUser = Email.extend({
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
export type NewUser = z.infer<typeof NewUser>
