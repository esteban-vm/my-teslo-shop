'use client'

import { Join } from 'rsc-daisyui'
import { useCartContext } from '@/hooks'
import { ErrorAlert } from './error-alert'

export function SizeSelector() {
  const product = useCartContext((s) => s.product)
  const isPosted = useCartContext((s) => s.isPosted)
  const currentSize = useCartContext((s) => s.currentSize)
  const setCurrentSize = useCartContext((s) => s.setCurrentSize)

  return (
    <>
      <ErrorAlert isShowing={isPosted && !currentSize} />
      <p className='font-semibold'>Tamaño:</p>
      <Join className='space-x-1'>
        {product.sizes.map((size) => {
          return (
            <Join.Button
              active={size === currentSize}
              ghost
              key={size}
              onClick={() => setCurrentSize(size)}
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
