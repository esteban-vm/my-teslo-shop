import validator from 'validator'
import { z } from 'zod'

export type EmailSchema = z.infer<typeof EmailSchema>
export type PasswordSchema = z.infer<typeof PasswordSchema>
export type LoginSchema = z.infer<typeof LoginSchema>
export type NewUserSchema = z.infer<typeof NewUserSchema>

const password = z
  .string()
  .trim()
  .refine((value) => !validator.isEmpty(value), {
    error: 'La contraseña no puede quedar vacía',
  })

const passwordRefineParams = {
  path: ['repeatPassword'],
  error: 'Las contraseñas deben coincidir',
}

export const EmailSchema = z.object({
  email: z
    .string()
    .trim()
    .refine((value) => !validator.isEmpty(value), {
      error: 'El correo electrónico no puede quedar vacío',
    })
    .superRefine((value, ctx) => {
      if (!validator.isEmail(value)) {
        ctx.addIssue({
          code: 'custom',
          message: 'El correo electrónico debe ser válido',
        })
      }
    }),
})

export const PasswordSchema = z
  .object({
    password: password.superRefine((value, ctx) => {
      if (!validator.isStrongPassword(value)) {
        ctx.addIssue({
          code: 'custom',
          message: `La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo`,
        })
      }
    }),

    repeatPassword: z
      .string()
      .trim()
      .refine((value) => !validator.isEmpty(value), {
        error: 'Este campo no puede quedar vacío',
      }),
  })
  .refine((value) => value.password === value.repeatPassword, passwordRefineParams)

export const LoginSchema = EmailSchema.extend({ password })

export const NewUserSchema = EmailSchema.extend({
  name: z
    .string()
    .trim()
    .refine((value) => !validator.isEmpty(value), {
      error: 'El nombre no puede quedar vacío',
    }),
})
  .extend(PasswordSchema.shape)
  .refine((value) => value.password === value.repeatPassword, passwordRefineParams)
