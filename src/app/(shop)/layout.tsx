import { Navigation } from '@/components/navigation'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Navigation />
      <main className='container mx-auto mt-13 border border-green-500'>{children}</main>
    </>
  )
}
