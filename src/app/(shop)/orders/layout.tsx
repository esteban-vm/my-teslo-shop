import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function OrdersLayout({ children }: LayoutProps<'/orders'>) {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')

  return <>{children}</>
}
