import { z } from 'zod'

const passwordParams = {
  path: ['repeatPassword'],
  error: 'Las contraseñas deben coincidir',
}

export const Email = z.object({
  email: z.email('Dirección de correo electrónico inválida').lowercase(),
})

export const Password = z
  .object({
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
  .refine((value) => value.password === value.repeatPassword, passwordParams)

export const Login = Email.extend({
  password: z.string().trim().nonempty(),
})

export const CreateUser = Email.extend({
  name: z.string().trim().nonempty().min(5).max(255),
})
  .safeExtend(Password.shape)
  .refine((value) => value.password === value.repeatPassword, passwordParams)

export type Email = z.infer<typeof Email>
export type Password = z.infer<typeof Password>
export type Login = z.infer<typeof Login>
export type CreateUser = z.infer<typeof CreateUser>
