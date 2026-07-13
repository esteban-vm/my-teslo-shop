'use client'

import type { FieldValues } from 'react-hook-form'
import type { FormControlProps } from '@/types'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useId } from 'react'
import { Controller } from 'react-hook-form'
import { Label, Select, Validator } from 'rsc-daisyui'
import { getCountries } from '@/actions/country'

export function CountrySelect<T extends FieldValues>({ control, name, ...rest }: FormControlProps<T>) {
  const selectId = useId()
  const errorId = useId()

  const {
    result: { data: countries },
    execute,
    isExecuting,
  } = useAction(getCountries)

  useEffect(execute, [execute])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
        return (
          <div className='w-full'>
            <Label as='label' htmlFor={selectId}>
              País:
            </Label>
            <Select
              {...rest}
              aria-errormessage={errorId}
              aria-invalid={invalid}
              className='w-full'
              color={isDirty && !invalid ? 'success' : undefined}
              disabled={isExecuting}
              id={selectId}
              required
              validator
              {...field}
            >
              <option value=''>[Seleccione]</option>
              {countries?.map(({ id, name }) => {
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
