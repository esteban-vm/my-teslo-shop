'use server'

import type { Route } from 'next'
import { signIn, signOut } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { actionClient } from '@/lib/safe-action'
import { AuthSchemas } from '@/schemas'

export const loginWithGitHub = actionClient.action(async () => {
  await signIn('github', { redirectTo: '/' satisfies Route })
})

export const loginWithGoogle = actionClient.action(async () => {
  await signIn('google', { redirectTo: '/' satisfies Route })
})

export const login = actionClient.inputSchema(AuthSchemas.LoginSchema).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email, password } = parsedInput
  await signIn('credentials', { email, password, redirectTo: '/' satisfies Route })
})

export const logout = actionClient.action(async () => {
  await signOut({ redirectTo: '/' satisfies Route })
})
