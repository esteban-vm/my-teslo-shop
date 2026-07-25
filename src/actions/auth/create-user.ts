'use server'

import { auth } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { SignUp } from '@/schemas/auth'

export const createUser = safeClient.inputSchema(SignUp).action(async ({ parsedInput }) => {
  await sleepExecution(3)
  const { email, name, password } = parsedInput
  const { user } = await auth.api.signUpEmail({ body: { email, name, password } })
  return { message: `Correo de verificación enviado a ${user.email}. Por favor, revísalo.` }
})
