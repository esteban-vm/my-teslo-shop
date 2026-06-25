'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useId } from 'react'
import { Controller } from 'react-hook-form'
import { Label, Select, Validator } from 'rsc-daisyui'
import { CountryActions } from '@/actions'

export type CountrySelectorBaseProps = Parameters<typeof Select>[0]

export interface CountrySelectorProps<T extends FieldValues> extends CountrySelectorBaseProps {
  control: Control<T>
  name: FieldPath<T>
}

export function CountrySelector<T extends FieldValues>({ control, name, ...rest }: CountrySelectorProps<T>) {
  const selectorId = useId()
  const errorId = useId()

  const {
    result: { data: countries },
    execute,
    isExecuting,
  } = useAction(CountryActions.getCountries)

  useEffect(execute, [execute])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
        return (
          <div className='w-full'>
            <Label as='label' htmlFor={selectorId}>
              País:
            </Label>
            <Select
              {...rest}
              aria-errormessage={errorId}
              aria-invalid={invalid}
              className='w-full'
              color={isDirty && !invalid ? 'success' : undefined}
              disabled={isExecuting}
              id={selectorId}
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
