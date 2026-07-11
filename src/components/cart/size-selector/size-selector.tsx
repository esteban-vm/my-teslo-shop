'use client'

import type { Size } from '@/prisma/generated/client'
import { useEffect } from 'react'
import { Join } from 'rsc-daisyui'
import { useCartUI } from '@/hooks'
import { ErrorAlert } from './error-alert'
import { SuccessAlert } from './success-alert'

export function SizeSelector({ sizes }: { sizes: Size[] }) {
  const isAdded = useCartUI((s) => s.isAdded)
  const isPosted = useCartUI((s) => s.isPosted)
  const currentSize = useCartUI((s) => s.currentSize)

  const setIsAdded = useCartUI((s) => s.setIsAdded)
  const setCurrentSize = useCartUI((s) => s.setCurrentSize)
  const resetCartUI = useCartUI((s) => s.resetCartUI)

  useEffect(resetCartUI, [resetCartUI])

  const onSizeChange = (size: Size) => {
    setIsAdded(false)
    setCurrentSize(size)
  }

  return (
    <>
      {isPosted && !currentSize && <ErrorAlert />}
      {isAdded && <SuccessAlert />}
      <p className='font-semibold'>Tamaño:</p>
      <Join className='space-x-1'>
        {sizes.map((size) => {
          return (
            <Join.Button
              active={size === currentSize}
              className='rounded-none'
              ghost
              key={size}
              onClick={() => onSizeChange(size)}
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
