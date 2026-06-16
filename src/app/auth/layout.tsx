import { redirect } from 'next/navigation'
import tw from 'tailwind-styled-components'
import { auth } from '@/auth'

export default async function AuthLayout({ children }: LayoutProps<'/auth'>) {
  const session = await auth()
  if (session?.user) redirect('/')

  return <PageContainer>{children}</PageContainer>
}

const PageContainer = tw.main`container mx-auto flex min-h-screen items-center justify-center`
