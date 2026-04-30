import tw from 'tailwind-styled-components'
import { Navigation } from '@/components/navigation'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Navigation />
      <MainContainer>{children}</MainContainer>
    </>
  )
}

const MainContainer = tw.main`container mx-auto mt-13 border border-cyan-500`
