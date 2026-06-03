import tw from 'tailwind-styled-components'

export default function AuthLayout({ children }: LayoutProps<'/auth'>) {
  return <Container>{children}</Container>
}

const Container = tw.main`container mx-auto flex h-screen min-h-192 items-center justify-center`
