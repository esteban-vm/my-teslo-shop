'use server'

import { sleepExecution } from '@/lib/helpers'
import { actionClient } from '@/lib/safe-action'
import { Login, UserDTO } from '@/schemas/auth'

export const loginWithGitHub = actionClient.action(async () => {
  console.log('login with GitHub')
})

export const loginWithGoogle = actionClient.action(async () => {
  console.log('login with Google')
})

export const loginWithCredentials = actionClient.inputSchema(Login).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email, password } = parsedInput
  console.log({ email, password })
})

export const logout = actionClient.action(async () => {
  await sleepExecution(1)
  console.log('logging out')
})

export const createUser = actionClient.inputSchema(UserDTO).action(async ({ parsedInput }) => {
  await sleepExecution(3)
  const { email, name, password } = parsedInput
  console.log({ email, name, password })
})
