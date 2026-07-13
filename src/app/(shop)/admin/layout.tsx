import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function AdminLayout({ children }: LayoutProps<'/admin'>) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user.role === 'user') {
    redirect('/')
  }

  return <>{children}</>
}
