'use server'

import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { sleep } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'
import { SignIn } from '@/schemas/auth'

export const signIn = safeClient.inputSchema(SignIn).action(async ({ parsedInput }) => {
  await sleep(5)
  const { email, password } = parsedInput
  await auth.api.signInEmail({ body: { email, password } })
  redirect('/')
})
