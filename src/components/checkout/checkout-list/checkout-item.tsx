import type { CartProduct } from '@/types'
import Image from 'next/image'
import { List } from 'rsc-daisyui'
import { formatProductPrice } from '@/lib/helpers'

export function CheckoutItem({ product }: { product: CartProduct }) {
  const { id, title, image, price, size, quantity } = product

  return (
    <List.Row className='items-center py-2 last:pb-3' id={id}>
      <div className='relative size-24 overflow-hidden rounded-box'>
        <Image alt={title} fill src={`/products/${image}`} />
      </div>
      <List.ColGrow className='space-y-1'>
        <p className='font-semibold'>
          {title} - {size}
        </p>
        <p>
          {formatProductPrice(price)} × {quantity} {quantity > 1 ? 'unidades' : 'unidad'}
        </p>
        <p>Subtotal: {formatProductPrice(price * quantity)}</p>
      </List.ColGrow>
    </List.Row>
  )
}
