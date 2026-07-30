import { z } from 'zod'
import './config'

const pswdParams = {
  path: ['repeatPassword'],
  error: 'Las contraseñas deben coincidir',
}

export const WithEmail = z.object({
  email: z.email('Dirección de correo electrónico inválida').lowercase(),
})

export const WithPassword = z
  .object({
    token: z.string(),

    password: z
      .string()
      .trim()
      .nonempty()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d\W]{8,20}$/,
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo'
      ),

    repeatPassword: z.string().trim().nonempty(),
  })
  .refine((value) => value.password === value.repeatPassword, pswdParams)

export const SignIn = WithEmail.extend({
  password: z.string().trim().nonempty(),
})

export const SignUp = WithEmail.extend({
  name: z.string().trim().nonempty().min(5).max(255),
})
  .safeExtend(WithPassword.omit({ token: true }).shape)
  .refine((value) => value.password === value.repeatPassword, pswdParams)

export type WithEmail = z.infer<typeof WithEmail>
export type WithPassword = z.infer<typeof WithPassword>
export type SignIn = z.infer<typeof SignIn>
export type SignUp = z.infer<typeof SignUp>
