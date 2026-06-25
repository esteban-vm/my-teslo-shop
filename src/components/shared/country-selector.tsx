'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useId } from 'react'
import { Controller } from 'react-hook-form'
import { Label, Select, Validator } from 'rsc-daisyui'
import { CountryActions } from '@/actions'

export interface CountrySelectorProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
}

export function CountrySelector<T extends FieldValues>({ control, name, label }: CountrySelectorProps<T>) {
  const fieldId = useId()
  const errorId = useId()
  const { execute, result, isExecuting } = useAction(CountryActions.getCountries)

  useEffect(execute, [execute])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error, isDirty, invalid } = fieldState

        return (
          <div className='w-full'>
            <Label as='label' htmlFor={fieldId}>
              {label}:
            </Label>
            <Select
              aria-errormessage={errorId}
              aria-invalid={invalid}
              className='w-full'
              color={isDirty && !invalid ? 'success' : undefined}
              disabled={isExecuting}
              id={fieldId}
              required
              validator
              {...field}
            >
              <option value=''>[Seleccione]</option>
              {result.data?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
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
