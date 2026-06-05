'use server'

import type { Route } from 'next'
import { signIn, signOut } from '@/auth'
import { actionClient } from '@/lib/safe-action'

export const signInWithGitHub = actionClient.action(async () => {
  await signIn('github', { redirectTo: '/' satisfies Route })
})

export const signInWithGoogle = actionClient.action(async () => {
  await signIn('google', { redirectTo: '/' satisfies Route })
})

const signOutAction = actionClient.action(async () => {
  await signOut({ redirectTo: '/' satisfies Route })
})

export { signOutAction as signOut }
