'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Checkbox, Fieldset } from 'rsc-daisyui'

export type RememberCheckBaseProps = Parameters<typeof Checkbox>[0]

export interface RememberCheckProps<T extends FieldValues> extends RememberCheckBaseProps {
  control: Control<T>
  name: FieldPath<T>
}

export function RememberCheck<T extends FieldValues>({ control, name, ...rest }: RememberCheckProps<T>) {
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
