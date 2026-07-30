'use server'

import type { Route } from 'next'
import { headers } from 'next/headers'
import { auth } from '@/auth'
import { ServerError } from '@/lib/errors'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { WithEmail } from '@/schemas/auth'

export const recoveryPassword = safeClient.inputSchema(WithEmail).action(async ({ parsedInput }) => {
  await sleepExecution(5)

  const user = await prisma.user.findFirst({ where: { email: parsedInput.email }, select: { email: true } })
  if (!user) throw new ServerError('Correo electrónico no registrado')

  const { email } = user
  const myHeaders = await headers()
  const origin = myHeaders.get('origin')
  const route: Route = '/auth/recovery-password'

  await auth.api.requestPasswordReset({ body: { email, redirectTo: origin + route } })
  return { message: `Correo de recuperación enviado a ${email}. Por favor, revísalo.` }
})
