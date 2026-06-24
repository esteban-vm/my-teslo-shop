'use client'

import { useAction } from 'next-safe-action/hooks'
import { useEffect, useId } from 'react'
import { Label, Select, Validator } from 'rsc-daisyui'
import { CountryActions } from '@/actions'
import { useAddressForm } from '@/hooks'

export function CountrySelector() {
  const selectId = useId()
  const errorId = useId()
  const { execute, result, isExecuting } = useAction(CountryActions.getCountries)

  const {
    form: {
      register,
      formState: { errors },
    },
  } = useAddressForm()

  useEffect(execute, [execute])

  return (
    <div className='w-full'>
      <Label as='label' htmlFor={selectId}>
        País:
      </Label>
      <Select
        aria-errormessage={errorId}
        aria-invalid={!!errors.countryId?.message}
        className='w-full'
        disabled={isExecuting}
        id={selectId}
        required
        validator
        {...register('countryId')}
      >
        <option value=''>[Seleccione]</option>
        {result.data?.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </Select>
      <Validator.Hint as='small' id={errorId} role='alert'>
        {errors.countryId?.message}
      </Validator.Hint>
    </div>
  )
}
