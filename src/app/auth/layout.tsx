import tw from 'tailwind-styled-components'
import { verifyNoUser } from '@/lib/auth'

export default async function AuthLayout({ children }: LayoutProps<'/auth'>) {
  await verifyNoUser()

  return <PageContainer>{children}</PageContainer>
}

const PageContainer = tw.main`container mx-auto flex min-h-screen items-center justify-center`
