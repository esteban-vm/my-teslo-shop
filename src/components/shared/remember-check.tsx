'use client'

import type { FieldValues } from 'react-hook-form'
import type { FormControlProps } from '@/types'
import { Controller } from 'react-hook-form'
import { Checkbox, Fieldset } from 'rsc-daisyui'

export function RememberCheck<T extends FieldValues>({ control, name, ...rest }: FormControlProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Fieldset.Label className='mt-2 select-none'>
            <Checkbox {...rest} size='sm' {...field} />
            ¿Recordar dirección?
          </Fieldset.Label>
        )
      }}
    />
  )
}
