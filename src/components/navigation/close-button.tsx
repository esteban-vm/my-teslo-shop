'use client'

import { X } from 'lucide-react'
import { Button } from 'rsc-daisyui'
import { closeSidebar } from '@/lib/utils'

export function CloseButton() {
  return (
    <Button ghost onClick={closeSidebar} shape='square' size='xs'>
      <X className='stroke-current' />
    </Button>
  )
}
