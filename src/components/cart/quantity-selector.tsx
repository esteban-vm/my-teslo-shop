'use client'

import type { ShoppingCartProduct } from '@/stores'
import { LucideMinus, LucidePlus } from 'lucide-react'
import { useState } from 'react'
import { Button, Join } from 'rsc-daisyui'
import { useShoppingCart, useShoppingCartUI } from '@/hooks'

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useShoppingCart((s) => s.addToCart)

  const product = useShoppingCartUI((s) => s.product)
  const currentSize = useShoppingCartUI((s) => s.currentSize)
  const setIsPosted = useShoppingCartUI((s) => s.setIsPosted)
  const setCurrentSize = useShoppingCartUI((s) => s.setCurrentSize)

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
      <Join className='space-x-1'>
        <Join.Button className='rounded-full' onClick={() => onQuantityChange(-1)} shape='square' size='sm'>
          <LucideMinus className='stroke-current/70' />
        </Join.Button>
        <Join.Input as='label' className='rounded-full outline-none' color='primary' size='sm'>
          <input className='text-center' maxLength={2} min={1} readOnly size={1} type='text' value={quantity} />
        </Join.Input>
        <Join.Button className='rounded-full' onClick={() => onQuantityChange(1)} shape='square' size='sm'>
          <LucidePlus className='stroke-current/70' />
        </Join.Button>
      </Join>
      <br />
      <Button color='secondary' onClick={onAddToCart} size='sm' wide>
        Agregar al carrito
      </Button>
    </div>
  )
}
