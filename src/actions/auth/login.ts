'use server'

import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { LoginDTO } from '@/schemas/auth'

export const login = safeClient.inputSchema(LoginDTO).action(async ({ parsedInput }) => {
  await sleepExecution(5)
  const { email, password } = parsedInput
  await auth.api.signInEmail({ body: { email, password } })
  redirect('/')
})
