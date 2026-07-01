import type { CartProduct } from '@/types'
import { List } from 'rsc-daisyui'
import { ItemImage } from '@/components/shared'
import { formatProductPrice } from '@/lib/helpers'

export function OrderItem({ product }: { product: CartProduct }) {
  const { title, image, price, size, quantity } = product

  return (
    <List.Row className='product-item'>
      <ItemImage image={image} title={title} />
      <List.ColGrow className='font-semibold'>
        <p>
          {title} - {size}
        </p>
        <p>
          {formatProductPrice(price)} ({quantity})
        </p>
        <p>Subtotal: {formatProductPrice(price * quantity)}</p>
      </List.ColGrow>
    </List.Row>
  )
}
