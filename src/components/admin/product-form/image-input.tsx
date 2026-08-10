'use client'

import { useId } from 'react'
import { FileInput, Label } from 'rsc-daisyui'

export function ImageInput() {
  const inputId = useId()

  return (
    <div className='w-full'>
      <Label as='label' className='required-label' htmlFor={inputId}>
        Fotos:
      </Label>
      <FileInput accept='image/png, image/jpeg' className='w-full' id={inputId} multiple />
    </div>
  )
}
