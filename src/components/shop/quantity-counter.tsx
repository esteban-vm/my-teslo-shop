'use client'

import { LucideMinus, LucidePlus } from 'lucide-react'
import { useState } from 'react'
import { Join } from 'rsc-daisyui'

export function QuantityCounter() {
  const [count, setCount] = useState(1)

  const handleClick = (value: number) => {
    const newCount = count + value
    if (newCount < 1 || newCount > 5) return
    setCount(newCount)
  }

  return (
    <>
      <p className='font-semibold'>Cantidad:</p>
      <Join className='space-x-1'>
        <Join.Button className='rounded-full' onClick={() => handleClick(-1)} shape='square' size='sm'>
          <LucideMinus className='stroke-current/70' />
        </Join.Button>
        <Join.Input as='label' className='rounded-full outline-none' color='primary' size='sm'>
          <input className='text-center' max={5} maxLength={1} min={1} readOnly size={1} type='text' value={count} />
        </Join.Input>
        <Join.Button className='rounded-full' onClick={() => handleClick(1)} shape='square' size='sm'>
          <LucidePlus className='stroke-current/70' />
        </Join.Button>
      </Join>
    </>
  )
}
