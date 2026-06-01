'use client'

import type { ShoppingCartProduct } from '@/stores'
import { useState } from 'react'
import { Button } from 'rsc-daisyui'
import { useCartContext, useShoppingCart } from '@/hooks'
import { CounterInput } from '../shared'

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useShoppingCart((s) => s.addToCart)

  const product = useCartContext((s) => s.product)
  const currentSize = useCartContext((s) => s.currentSize)
  const setIsPosted = useCartContext((s) => s.setIsPosted)
  const setCurrentSize = useCartContext((s) => s.setCurrentSize)

  const onQuantityChange = (value: number) => {
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
    setIsPosted(false)
    setCurrentSize(undefined)
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
