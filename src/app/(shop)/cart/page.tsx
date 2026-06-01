import Link from 'next/link'
import { Button, List } from 'rsc-daisyui'
import { CartItem } from '@/components/cart'
import { PageTitle } from '@/components/shared'

export default function CartPage() {
  return (
    <>
      <PageTitle title='Mi carrito' />
      <div className='my-3 grid gap-3 lg:grid-cols-3'>
        <div className='px-5 py-3 lg:col-span-2'>
          <List>
            <li className='px-4 pt-2'>
              <h2 className='font-semibold text-lg'>Agregar más artículos</h2>
            </li>
            <li className='px-4'>
              <Button as={Link} className='p-0' color='info' href='/' link size='sm'>
                Continúa comprando
              </Button>
            </li>
            <CartItem />
            <CartItem />
            <CartItem />
          </List>
        </div>
        <div className='h-64 border border-primary'></div>
      </div>
    </>
  )
}
