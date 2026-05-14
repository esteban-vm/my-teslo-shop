'use client'

import { X } from 'lucide-react'
import { Button } from 'rsc-daisyui'
import { DRAWER_ID } from '@/lib/constants'

export function CloseButton() {
  const handleClose = () => {
    const checkbox = document.getElementById(DRAWER_ID) as HTMLInputElement
    checkbox.checked = false
  }

  return (
    <Button ghost onClick={handleClose} shape='square' size='xs'>
      <X className='stroke-current' />
    </Button>
  )
}
