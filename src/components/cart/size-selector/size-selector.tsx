'use client'

import type { Size } from '@/generated/prisma/client'
import { useEffect } from 'react'
import { Join } from 'rsc-daisyui'
import { useCartUI } from '@/hooks'
import { ErrorAlert } from './error-alert'

export function SizeSelector({ sizes }: { sizes: Size[] }) {
  const isPosted = useCartUI((s) => s.isPosted)
  const currentSize = useCartUI((s) => s.currentSize)
  const setIsPosted = useCartUI((s) => s.setIsPosted)
  const setCurrentSize = useCartUI((s) => s.setCurrentSize)

  useEffect(() => {
    setIsPosted(false)
    setCurrentSize(null)
  }, [setCurrentSize, setIsPosted])

  return (
    <>
      <ErrorAlert isShowing={isPosted && !currentSize} />
      <p className='font-semibold'>Tamaño:</p>
      <Join className='space-x-1'>
        {sizes.map((size) => {
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
