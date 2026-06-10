import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export async function userExists() {
  const session = await auth()
  return !!session?.user
}

export async function verifyNoUser() {
  const session = await auth()
  if (session?.user) redirect('/')
}

export async function verifyUser() {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')
  return session.user
}
