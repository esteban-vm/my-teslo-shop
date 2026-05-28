'use client'

import { Join } from 'rsc-daisyui'
import { useAddToCart } from '@/hooks'

export function SizeSelector() {
  const selectedSize = useAddToCart((s) => s.selectedSize)
  const sizes = useAddToCart((s) => s.sizes)
  const setSize = useAddToCart((s) => s.setSize)

  return (
    <>
      <p className='font-semibold'>Tamaño:</p>
      <Join className='space-x-1'>
        {sizes.map((size) => {
          return (
            <Join.Button
              active={size === selectedSize}
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
