'use server'

import type { Route } from 'next'
import { auth } from '@/lib/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { Login, UserDTO } from '@/schemas/auth'

export const loginWithGitHub = safeClient.action(async () => {
  await auth.api.signInSocial({
    body: { provider: 'github', callbackURL: '/' satisfies Route },
  })
})

export const loginWithGoogle = safeClient.action(async () => {
  await auth.api.signInSocial({
    body: { provider: 'google', callbackURL: '/' satisfies Route },
  })
})

export const loginWithCredentials = safeClient.inputSchema(Login).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email, password } = parsedInput
  console.log({ email, password })
})

export const logout = safeClient.action(async () => {
  await sleepExecution(1)
  console.log('logging out')
})

export const createUser = safeClient.inputSchema(UserDTO).action(async ({ parsedInput }) => {
  await sleepExecution(3)
  const { email, name, password } = parsedInput
  console.log({ email, name, password })
})
