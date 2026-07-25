'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { sleepExecution } from '@/lib/helpers'
import { safeClient } from '@/lib/safe-action'

export const signOut = safeClient.action(async () => {
  await sleepExecution(2)
  await auth.api.signOut({ headers: await headers() })
  redirect('/')
})
