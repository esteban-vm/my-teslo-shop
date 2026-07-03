'use server'

import { hash } from 'bcryptjs'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
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
  const passwordHash = await hash(password, 10)

  const createdUser = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: passwordHash,
    },
    select: { email: true },
  })

  console.log({ createdUser })
})
