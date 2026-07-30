'use server'

import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { WithPassword } from '@/schemas/auth'

export const resetPassword = safeClient.inputSchema(WithPassword).action(async () => {
  await sleepExecution(5)
})
