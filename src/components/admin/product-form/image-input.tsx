'use client'

import type { FieldValues } from 'react-hook-form'
import type { NamedFormControlProps } from '@/types'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { FileInput, Label, Validator } from 'rsc-daisyui'
import { ACCEPTED_IMAGE_TYPES } from '@/lib/constants'

export function ImageInput<T extends FieldValues>({ control, name }: NamedFormControlProps<T>) {
  const inputId = useId()
  const errorId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: _, ...rest }, fieldState: { error, isDirty, invalid } }) => {
        return (
          <div className='w-full'>
            <Label as='label' className='required-label' htmlFor={inputId}>
              Imágenes:
            </Label>
            <FileInput
              accept={ACCEPTED_IMAGE_TYPES.join(', ')}
              aria-errormessage={errorId}
              aria-invalid={invalid}
              className='w-full'
              color={!invalid && isDirty ? 'success' : undefined}
              id={inputId}
              multiple
              onChange={(e) => onChange(e.target.files)}
              validator
              {...rest}
            />
            <Validator.Hint as='small' id={errorId} role='alert'>
              {error?.message}
            </Validator.Hint>
          </div>
        )
      }}
    />
  )
}
