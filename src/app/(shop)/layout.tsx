import { Navigation } from '@/components/navigation'
import { PageFooter } from '@/components/shared'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <Navigation>
      <div className='container mx-auto'>{children}</div>
      <PageFooter />
    </Navigation>
  )
}
