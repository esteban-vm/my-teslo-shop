import tw from 'tailwind-styled-components'

export default function AuthLayout({ children }: LayoutProps<'/auth'>) {
  return <PageContainer>{children}</PageContainer>
}

const PageContainer = tw.main`container mx-auto flex min-h-screen items-center justify-center`
