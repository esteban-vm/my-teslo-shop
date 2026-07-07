import { z } from 'zod'
import { ValidationErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'
import { notEmpty, passwordParams } from './shared'

export const EmailDTO = z.object({
  email: notEmpty.superRefine((value, ctx) => {
    if (Validations.notEmail(value)) {
      ctx.addIssue(ValidationErrorMap.notEmail)
    }
  }),
})

export const PasswordDTO = z
  .object({
    password: notEmpty.superRefine((value, ctx) => {
      if (Validations.notPassword(value)) {
        ctx.addIssue(ValidationErrorMap.notPassword)
      }
    }),

    repeatPassword: notEmpty,
  })
  .refine((value) => value.password === value.repeatPassword, passwordParams)

export const LoginDTO = EmailDTO.extend({ password: notEmpty })

export const NewUserDTO = EmailDTO.extend({ name: notEmpty })
  .extend(PasswordDTO.shape)
  .refine((value) => value.password === value.repeatPassword, passwordParams)

export type EmailDTO = z.infer<typeof EmailDTO>
export type PasswordDTO = z.infer<typeof PasswordDTO>
export type LoginDTO = z.infer<typeof LoginDTO>
export type NewUserDTO = z.infer<typeof NewUserDTO>
