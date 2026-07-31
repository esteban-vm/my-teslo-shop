'use server'

import { auth } from '@/auth'
import { sleep } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { WithPassword } from '@/schemas/auth'

export const resetPassword = safeClient.inputSchema(WithPassword).action(async ({ parsedInput }) => {
  await sleep(5)
  const { password, token } = parsedInput
  await auth.api.resetPassword({ body: { token, newPassword: password } })
  return { message: 'Contraseña restablecida correctamente' }
})
