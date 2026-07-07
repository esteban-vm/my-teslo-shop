'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { LoginDTO, NewUserDTO } from '@/schemas/auth'

export const login = safeClient.inputSchema(LoginDTO).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email, password } = parsedInput
  await auth.api.signInEmail({ body: { email, password } })
  redirect('/')
})

export const logout = safeClient.action(async () => {
  await sleepExecution(2)
  await auth.api.signOut({ headers: await headers() })
  redirect('/')
})

export const createUser = safeClient.inputSchema(NewUserDTO).action(async ({ parsedInput }) => {
  await sleepExecution(3)
  const { email, name, password } = parsedInput
  const { user } = await auth.api.signUpEmail({ body: { email, name, password } })
  return { message: `Correo de verificación enviado a ${user.email}. Por favor, revísalo.` }
})
