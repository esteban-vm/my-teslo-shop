'use client'

import type { Country } from '@/prisma/generated/client'
import { useId } from 'react'
import { Label, Select, Validator } from 'rsc-daisyui'
import { useAddressForm } from '@/hooks'

export function CountrySelector({ countries }: { countries: Country[] }) {
  const selectId = useId()
  const errorId = useId()

  const {
    form: {
      register,
      formState: { errors },
    },
  } = useAddressForm()

  return (
    <div className='w-full'>
      <Label as='label' htmlFor={selectId}>
        País:
      </Label>
      <Select
        aria-errormessage={errorId}
        aria-invalid={!!errors.countryId?.message}
        className='w-full'
        id={selectId}
        required
        validator
        {...register('countryId')}
      >
        <option value=''>[Seleccione]</option>
        {countries.map((country) => (
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
