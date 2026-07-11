import type { CartProduct } from '@/types'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button, List } from 'rsc-daisyui'
import { CounterInput, ItemImage } from '@/components/shared'
import { useCartStore } from '@/hooks'
import { formatProductPrice } from '@/lib/helpers'

export function CartItem({ product }: { product: CartProduct }) {
  const { id, title, image, price, size, quantity, slug } = product

  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeFromCart = useCartStore((s) => s.removeFromCart)

  const onQuantityChange = (value: number) => {
    const newQuantity = quantity + value
    if (newQuantity < 1 || newQuantity > 5) return
    updateQuantity(product, newQuantity)
  }

  return (
    <List.Row className='product-item' id={id}>
      <ItemImage image={image} title={title} />
      <List.ColGrow>
        <Link className='font-semibold hover:opacity-75' href={`/product/${slug}`}>
          {title} - {size}
        </Link>
        <p className='text-sm'>{formatProductPrice(price)}</p>
        <CounterInput
          onDecrease={() => onQuantityChange(-1)}
          onIncrease={() => onQuantityChange(1)}
          quantity={quantity}
        />
      </List.ColGrow>
      <Button
        ghost
        onClick={() => removeFromCart(product)}
        shape='square'
        size='sm'
        title='Eliminar producto del carrito'
      >
        <Trash2 className='stroke-current/75' />
      </Button>
    </List.Row>
  )
}
