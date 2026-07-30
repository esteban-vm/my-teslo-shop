'use server'

import type { Route } from 'next'
import { auth } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { WithEmail } from '@/schemas/auth'

export const recoveryPassword = safeClient.inputSchema(WithEmail).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email } = parsedInput
  await auth.api.requestPasswordReset({ body: { email, redirectTo: '/auth/recovery-password' satisfies Route } })
  return { message: `Correo de recuperación enviado a ${email}. Por favor, revísalo.` }
})
