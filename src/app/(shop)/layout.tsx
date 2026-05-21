import { Navigation } from '@/app/_navigation'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <Navigation>
      <div className='container mx-auto'>{children}</div>
    </Navigation>
  )
}
