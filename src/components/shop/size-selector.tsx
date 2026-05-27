import type { Size } from '@/generated/prisma/client'
import { Join } from 'rsc-daisyui'

export interface SizeSelectorProps {
  selectedSize: Size
  availableSizes: Size[]
}

export function SizeSelector({ selectedSize, availableSizes }: SizeSelectorProps) {
  return (
    <>
      <h2 className='font-semibold'>Selector de tallas</h2>
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
