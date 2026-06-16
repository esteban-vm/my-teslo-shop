'use server'

import type { Route } from 'next'
import { hash } from 'bcryptjs'
import { signIn, signOut } from '@/auth'
import { CredentialsSigninError } from '@/lib/errors'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { actionClient } from '@/lib/safe-action'
import { AuthSchemas } from '@/schemas'

const homePage: Route = '/'

export const loginWithGitHub = actionClient.action(async () => {
  await signIn('github', { redirectTo: homePage })
})

export const loginWithGoogle = actionClient.action(async () => {
  await signIn('google', { redirectTo: homePage })
})

export const loginWithCredentials = actionClient
  .inputSchema(AuthSchemas.LoginSchema)
  .action(async ({ parsedInput }) => {
    await sleepExecution(5)
    const { email, password } = parsedInput
    await signIn('credentials', { email, password, redirectTo: homePage })
  })

export const logout = actionClient.action(async () => {
  await sleepExecution(1)
  await signOut({ redirectTo: homePage })
})

export const createUserWithCredentials = actionClient
  .inputSchema(AuthSchemas.NewUserSchema)
  .action(async ({ parsedInput }) => {
    await sleepExecution(3)
    const { email, name, password } = parsedInput
    const savedUser = await prisma.user.findUnique({ where: { email, active: true } })

    if (savedUser) {
      throw new CredentialsSigninError('Correo electrónico en uso')
    }

    const passwordHash = await hash(password, 10)

    const createdUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: passwordHash,
      },
      select: { email: true },
    })

    await signIn('credentials', { email: createdUser.email, password, redirectTo: homePage })
  })
