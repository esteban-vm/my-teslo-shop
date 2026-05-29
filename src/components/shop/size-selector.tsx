'use client'

import { TriangleAlert } from 'lucide-react'
import { Alert, Join } from 'rsc-daisyui'
import { useAddToCart } from '@/hooks'

export function SizeSelector() {
  const size = useAddToCart((s) => s.size)
  const sizes = useAddToCart((s) => s.sizes)
  const posted = useAddToCart((s) => s.posted)
  const setSize = useAddToCart((s) => s.setSize)

  return (
    <>
      {posted && !size && (
        <Alert className='w-fit gap-1 px-2 py-1 text-sm' color='error' soft>
          <TriangleAlert className='size-4 stroke-current' />
          <span>Tamaño requerido</span>
        </Alert>
      )}
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
