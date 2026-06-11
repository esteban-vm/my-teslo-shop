'use server'

import type { Route } from 'next'
import { signIn, signOut } from '@/auth'
import { CredentialsSigninError } from '@/lib/errors'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
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

export const createUser = actionClient.inputSchema(AuthSchemas.NewUserSchema).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email, name, password } = parsedInput

  const savedUser = await prisma.user.findUnique({ where: { email, active: true } })

  if (savedUser) {
    throw new CredentialsSigninError('Correo electrónico en uso')
  }

  const createdUser = await prisma.user.create({ data: { email, name, password } })
  return createdUser
})
