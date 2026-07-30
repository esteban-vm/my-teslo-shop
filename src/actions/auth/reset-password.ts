'use server'

import { auth } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { WithPassword } from '@/schemas/auth'

export const resetPassword = safeClient.inputSchema(WithPassword).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { password, token } = parsedInput
  await auth.api.resetPassword({ body: { token, newPassword: password } })
  return { message: 'Contraseña restablecida correctamente' }
})
