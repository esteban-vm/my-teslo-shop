'use client'

import { XIcon } from 'lucide-react'
import { Button } from 'rsc-daisyui'
import { closeSidebar } from '@/lib/ui'

export function CloseButton() {
  return (
    <Button ghost onClick={closeSidebar} shape='square' size='xs'>
      <XIcon className='stroke-current' />
    </Button>
  )
}
