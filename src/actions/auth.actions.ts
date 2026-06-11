'use server'

import type { Route } from 'next'
import { signIn, signOut } from '@/auth'
import { actionClient } from '@/lib/safe-action'

export const loginWithGitHub = actionClient.action(async () => {
  await signIn('github', { redirectTo: '/' satisfies Route })
})

export const loginWithGoogle = actionClient.action(async () => {
  await signIn('google', { redirectTo: '/' satisfies Route })
})

export const logout = actionClient.action(async () => {
  await signOut({ redirectTo: '/' satisfies Route })
})
