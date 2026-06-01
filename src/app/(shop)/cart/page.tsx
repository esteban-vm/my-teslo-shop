import { CartList } from '@/components/cart'
import { PageTitle } from '@/components/shared'

export default function CartPage() {
  return (
    <>
      <PageTitle title='Mi carrito' />
      <div className='my-3 grid gap-3 lg:grid-cols-3'>
        <div className='px-5 py-3 lg:col-span-2'>
          <CartList />
        </div>
        <div className='h-64 border border-primary'></div>
      </div>
    </>
  )
}
