'use server'

import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { Login, UserDTO } from '@/schemas/auth'

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
