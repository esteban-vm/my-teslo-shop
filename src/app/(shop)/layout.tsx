import { Navigation } from '@/components/navigation'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return <Navigation>{children}</Navigation>
}
