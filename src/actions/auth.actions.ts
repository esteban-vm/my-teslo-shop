'use server'

import type { Route } from 'next'
import { signIn } from '@/auth'
import { actionClient } from '@/lib/safe-action'

export const signInWithGitHub = actionClient.action(async () => {
  await signIn('github', { redirectTo: '/' satisfies Route })
})

export const signInWithGoogle = actionClient.action(async () => {
  await signIn('google', { redirectTo: '/' satisfies Route })
})
