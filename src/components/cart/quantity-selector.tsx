'use client'

import type { CartProduct, ProductResult } from '@/types'
import { useState } from 'react'
import { Button } from 'rsc-daisyui'
import { useCartStore, useCartUIStore } from '@/hooks'
import { CounterInput } from '../shared'

export function QuantitySelector({ product }: { product: ProductResult }) {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCartStore((s) => s.addToCart)

  const currentSize = useCartUIStore((s) => s.currentSize)
  const setIsAdded = useCartUIStore((s) => s.setIsAdded)
  const setIsPosted = useCartUIStore((s) => s.setIsPosted)
  const setCurrentSize = useCartUIStore((s) => s.setCurrentSize)

  const onQuantityChange = (value: number) => {
    setIsAdded(false)
    const newQuantity = quantity + value
    if (newQuantity < 1 || newQuantity > 5) return
    setQuantity(newQuantity)
  }

  const onAddToCart = () => {
    setIsAdded(false)
    setIsPosted(true)
    if (!currentSize) return

    const cartProduct: CartProduct = {
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
