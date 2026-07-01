import type { CartProduct } from '@/types'
import { List } from 'rsc-daisyui'
import { ItemImage } from '@/components/shared'
import { formatProductPrice } from '@/lib/helpers'

export function CheckoutItem({ product }: { product: CartProduct }) {
  const { title, image, price, size, quantity } = product

  return (
    <List.Row className='product-item'>
      <ItemImage image={image} title={title} />
      <List.ColGrow>
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
