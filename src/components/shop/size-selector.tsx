'use client'

import { Join } from 'rsc-daisyui'
import { useAddToCart } from '@/hooks'

export function SizeSelector() {
  const currSize = useAddToCart((s) => s.size)
  const sizes = useAddToCart((s) => s.sizes)
  const setSize = useAddToCart((s) => s.setSize)

  return (
    <>
      <p className='font-semibold'>Tamaño:</p>
      <Join className='space-x-1'>
        {sizes.map((size) => {
          return (
            <Join.Button
              active={size === currSize}
              ghost
              key={size}
              onClick={() => setSize(size)}
              shape='square'
              size='sm'
            >
              {size}
            </Join.Button>
          )
        })}
      </Join>
    </>
  )
}
