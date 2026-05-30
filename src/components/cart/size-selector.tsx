'use client'

import { TriangleAlert } from 'lucide-react'
import { Alert, Join } from 'rsc-daisyui'
import { useShoppingCartUI } from '@/hooks'
import { cn } from '@/lib/ui'

export function SizeSelector() {
  const size = useShoppingCartUI((s) => s.size)
  const sizes = useShoppingCartUI((s) => s.sizes)
  const posted = useShoppingCartUI((s) => s.posted)
  const setSize = useShoppingCartUI((s) => s.setSize)

  return (
    <>
      <Alert
        className={cn('w-fit gap-1 px-2 py-1 text-sm', posted && !size ? 'fade-in animate-in' : 'hidden')}
        color='error'
        soft
      >
        <TriangleAlert className='size-4 stroke-current' />
        <span>Tamaño requerido</span>
      </Alert>
      <p className='font-semibold'>Tamaño:</p>
      <Join className='space-x-1'>
        {sizes.map((s) => {
          return (
            <Join.Button active={s === size} ghost key={s} onClick={() => setSize(s)} shape='square' size='sm'>
              {s}
            </Join.Button>
          )
        })}
      </Join>
    </>
  )
}
