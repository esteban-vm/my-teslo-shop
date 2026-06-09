import type { CartProduct } from '@/types'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, List } from 'rsc-daisyui'
import { CounterInput } from '@/components/shared'
import { useShoppingCart } from '@/hooks'
import { formatProductPrice } from '@/lib/helpers'

export function CartItem({ product }: { product: CartProduct }) {
  const { id, title, image, price, size, slug, quantity } = product

  const updateQuantity = useShoppingCart((s) => s.updateQuantity)
  const removeFromCart = useShoppingCart((s) => s.removeFromCart)

  const onQuantityChange = (value: number) => {
    const newQuantity = quantity + value
    if (newQuantity < 1 || newQuantity > 5) return
    updateQuantity(product, newQuantity)
  }

  return (
    <List.Row className='items-center py-2 last:pb-3' id={id}>
      <div className='relative size-24 overflow-hidden rounded-box'>
        <Image alt={title} fill src={`/products/${image}`} />
      </div>
      <List.ColGrow className='space-y-1'>
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
