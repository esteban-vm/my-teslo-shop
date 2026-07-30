'use client'

import type { FieldValues } from 'react-hook-form'
import type { LabeledFormControlProps } from '@/types'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { Label, Select, Validator } from 'rsc-daisyui'

export type BaseDataSelectProps = Omit<JSX.IntrinsicElements['select'], 'name' | 'size'>

export interface DataSelectProps<T extends FieldValues> extends LabeledFormControlProps<T>, BaseDataSelectProps {
  data?: { id: string; name: string }[]
}

export function DataSelect<T extends FieldValues>({ control, name, label, data, ...rest }: DataSelectProps<T>) {
  const selectId = useId()
  const errorId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
        return (
          <div className='w-full'>
            <Label as='label' htmlFor={selectId}>
              {label}
            </Label>
            <Select
              {...rest}
              aria-errormessage={errorId}
              aria-invalid={invalid}
              className='w-full'
              color={isDirty && !invalid ? 'success' : undefined}
              id={selectId}
              required
              validator
              {...field}
            >
              <option value=''>[Selecciona]</option>
              {data?.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                )
              })}
            </Select>
            <Validator.Hint as='small' id={errorId} role='alert'>
              {error?.message}
            </Validator.Hint>
          </div>
        )
      }}
    />
  )
}
