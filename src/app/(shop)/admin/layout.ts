import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export type Props = LayoutProps<'/admin'>

export default async function Layout({ children }: Props) {
  const session = await getSession()
  if (session?.user.role === 'user') redirect('/')

  return children
}
