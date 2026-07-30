'use server'

import type { Route } from 'next'
import { headers } from 'next/headers'
import { auth } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { WithEmail } from '@/schemas/auth'

export const recoveryPassword = safeClient.inputSchema(WithEmail).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email } = parsedInput
  const myHeaders = await headers()
  const origin = myHeaders.get('origin')
  const route: Route = '/auth/recovery-password'
  await auth.api.requestPasswordReset({ body: { email, redirectTo: origin + route } })
  return { message: `Correo de recuperación enviado a ${email}. Por favor, revísalo.` }
})
