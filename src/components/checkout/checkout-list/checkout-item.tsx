import type { CartProduct } from '@/types'
import { List } from 'rsc-daisyui'
import { ItemImage } from '@/components/shared'
import { formatPrice } from '@/lib/helpers'

export function CheckoutItem({ product }: { product: CartProduct }) {
  const { id, title, image, price, size, quantity } = product

  return (
    <List.Row className='product-item' id={id}>
      <ItemImage image={image} title={title} />
      <List.ColGrow>
        <p className='font-semibold'>
          {title} - {size}
        </p>
        <p>
          {formatPrice(price)} × {quantity} {quantity > 1 ? 'unidades' : 'unidad'}
        </p>
        <p>Subtotal: {formatPrice(price * quantity)}</p>
      </List.ColGrow>
    </List.Row>
  )
}
