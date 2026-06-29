import { Navigation } from '@/components/navigation'
import { PageFooter } from '@/components/pages'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <Navigation>
      <div className='container mx-auto'>{children}</div>
      <PageFooter />
    </Navigation>
  )
}
