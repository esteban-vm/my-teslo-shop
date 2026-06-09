'use client'

import type { PropsWithProduct, ShoppingCartProduct } from '@/types'
import { useState } from 'react'
import { Button } from 'rsc-daisyui'
import { useCartUI, useShoppingCart } from '@/hooks'
import { CounterInput } from '../shared'

export function QuantitySelector({ product }: PropsWithProduct) {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useShoppingCart((s) => s.addToCart)

  const currentSize = useCartUI((s) => s.currentSize)
  const setIsAdded = useCartUI((s) => s.setIsAdded)
  const setIsPosted = useCartUI((s) => s.setIsPosted)
  const setCurrentSize = useCartUI((s) => s.setCurrentSize)

  const onQuantityChange = (value: number) => {
    setIsAdded(false)
    const newQuantity = quantity + value
    if (newQuantity < 1 || newQuantity > 5) return
    setQuantity(newQuantity)
  }

  const onAddToCart = () => {
    setIsPosted(true)
    if (!currentSize) return

    const cartProduct: ShoppingCartProduct = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      quantity,
      size: currentSize,
      image: product.images[0],
    }

    addToCart(cartProduct)
    setQuantity(1)
    setIsAdded(true)
    setIsPosted(false)
    setCurrentSize(null)
  }

  return (
    <div className='w-fit space-y-1.5'>
      <p className='font-semibold'>Cantidad:</p>
      <CounterInput
        onDecrease={() => onQuantityChange(-1)}
        onIncrease={() => onQuantityChange(1)}
        quantity={quantity}
      />
      <br />
      <Button color='secondary' onClick={onAddToCart} size='sm' wide>
        Agregar al carrito
      </Button>
    </div>
  )
}
