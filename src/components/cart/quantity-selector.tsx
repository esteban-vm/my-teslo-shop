'use client'

import { LucideMinus, LucidePlus } from 'lucide-react'
import { Button, Join } from 'rsc-daisyui'
import { useShoppingCartUI } from '@/hooks'

export function QuantitySelector() {
  const quantity = useShoppingCartUI((s) => s.quantity)
  const currentSize = useShoppingCartUI((s) => s.currentSize)
  const decreaseQuantity = useShoppingCartUI((s) => s.decreaseQuantity)
  const increaseQuantity = useShoppingCartUI((s) => s.increaseQuantity)
  const setIsPosted = useShoppingCartUI((s) => s.setIsPosted)

  const onAddToCart = () => {
    setIsPosted(true)
    if (!currentSize) return
    console.log({ size: currentSize, quantity })
  }

  return (
    <div className='w-fit space-y-1.5'>
      <p className='font-semibold'>Cantidad:</p>
      <Join className='space-x-1'>
        <Join.Button className='rounded-full' onClick={decreaseQuantity} shape='square' size='sm'>
          <LucideMinus className='stroke-current/70' />
        </Join.Button>
        <Join.Input as='label' className='rounded-full outline-none' color='primary' size='sm'>
          <input className='text-center' maxLength={2} min={1} readOnly size={1} type='text' value={quantity} />
        </Join.Input>
        <Join.Button className='rounded-full' onClick={increaseQuantity} shape='square' size='sm'>
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
