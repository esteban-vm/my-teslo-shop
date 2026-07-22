import { Navigation } from '@/components/navigation'
import { PageFooter } from '@/components/shared'

export type Props = LayoutProps<'/'>

export default function Layout({ children }: Props) {
  return (
    <Navigation>
      <div className='container mx-auto'>{children}</div>
      <PageFooter />
    </Navigation>
  )
}
