'use client'

import { TriangleAlert } from 'lucide-react'
import { Alert, Join } from 'rsc-daisyui'
import { useCartContext } from '@/hooks'
import { cn } from '@/lib/ui'

export function SizeSelector() {
  const product = useCartContext((s) => s.product)
  const isPosted = useCartContext((s) => s.isPosted)
  const currentSize = useCartContext((s) => s.currentSize)
  const setCurrentSize = useCartContext((s) => s.setCurrentSize)

  const showError = isPosted && !currentSize

  return (
    <>
      <Alert
        className={cn('w-fit gap-1 px-2 py-1 text-sm', showError ? 'fade-in animate-in' : 'hidden')}
        color='error'
        soft
      >
        <TriangleAlert className='size-4 stroke-current' />
        <span>Tamaño requerido</span>
      </Alert>
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
