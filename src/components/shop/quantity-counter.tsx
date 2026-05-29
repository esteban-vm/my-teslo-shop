'use client'

import { LucideMinus, LucidePlus } from 'lucide-react'
import { Button, Join } from 'rsc-daisyui'
import { useAddToCart } from '@/hooks'

export function QuantityCounter() {
  const quantity = useAddToCart((s) => s.quantity)
  const decrement = useAddToCart((s) => s.decrement)
  const increment = useAddToCart((s) => s.increment)

  const addToCart = () => {}

  return (
    <div className='w-fit space-y-1.5'>
      <p className='font-semibold'>Cantidad:</p>
      <Join className='space-x-1'>
        <Join.Button className='rounded-full' onClick={decrement} shape='square' size='sm'>
          <LucideMinus className='stroke-current/70' />
        </Join.Button>
        <Join.Input as='label' className='rounded-full outline-none' color='primary' size='sm'>
          <input className='text-center' maxLength={2} min={1} readOnly size={2} type='text' value={quantity} />
        </Join.Input>
        <Join.Button className='rounded-full' onClick={increment} shape='square' size='sm'>
          <LucidePlus className='stroke-current/70' />
        </Join.Button>
      </Join>
      <br />
      <Button color='secondary' onClick={addToCart} size='sm' wide>
        Agregar al carrito
      </Button>
    </div>
  )
}
