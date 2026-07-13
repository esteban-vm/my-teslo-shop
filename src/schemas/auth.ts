import { z } from 'zod'
import { ValidationErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'
import { notEmpty, passwordParams } from './shared'

export const Email = z.object({
  email: notEmpty.superRefine((value, ctx) => {
    if (Validations.notEmail(value)) {
      ctx.addIssue(ValidationErrorMap.notEmail)
    }
  }),
})

export const Password = z
  .object({
    password: notEmpty.superRefine((value, ctx) => {
      if (Validations.notPassword(value)) {
        ctx.addIssue(ValidationErrorMap.notPassword)
      }
    }),

    repeatPassword: notEmpty,
  })
  .refine((value) => value.password === value.repeatPassword, passwordParams)

export const Login = Email.extend({ password: notEmpty })

export const CreateUser = Email.extend({ name: notEmpty })
  .extend(Password.shape)
  .refine((value) => value.password === value.repeatPassword, passwordParams)

export type Email = z.infer<typeof Email>
export type Password = z.infer<typeof Password>
export type Login = z.infer<typeof Login>
export type CreateUser = z.infer<typeof CreateUser>
