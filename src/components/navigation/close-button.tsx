'use client'

import { X } from 'lucide-react'
import { Button } from 'rsc-daisyui'

export function CloseButton({ id }: Props.WithId) {
  const handleClose = () => {
    const checkbox = document.getElementById(id) as HTMLInputElement
    checkbox.checked = false
  }

  return (
    <Button ghost onClick={handleClose} shape='square' size='xs'>
      <X className='stroke-current' />
    </Button>
  )
}
