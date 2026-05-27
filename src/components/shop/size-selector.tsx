import type { Size } from '@/generated/prisma/client'
import { Join } from 'rsc-daisyui'

export interface SizeSelectorProps {
  selectedSize: Size
  availableSizes: Size[]
}

export function SizeSelector({ selectedSize, availableSizes }: SizeSelectorProps) {
  return (
    <>
      <p className='font-semibold'>Tamaño:</p>
      <Join className='space-x-1'>
        {availableSizes.map((size) => {
          return (
            <Join.Button active={size === selectedSize} ghost key={size} shape='square' size='sm'>
              {size}
            </Join.Button>
          )
        })}
      </Join>
    </>
  )
}
