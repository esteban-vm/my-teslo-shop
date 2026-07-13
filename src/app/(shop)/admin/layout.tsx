import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function AdminLayout({ children }: LayoutProps<'/admin'>) {
  const session = await getSession()
  if (session?.user.role === 'user') redirect('/')

  return <>{children}</>
}
