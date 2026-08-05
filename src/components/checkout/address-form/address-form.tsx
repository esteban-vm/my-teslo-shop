'use client'

import type { AddressResult } from '@/schemas/address'
import { Fieldset } from 'rsc-daisyui'
import { FormButtons, FormField } from '@/components/shared'
import { useAddressForm } from '@/hooks'
import { CountrySelect } from './country-select'
import { RememberCheck } from './remember-check'

export interface AddressFormProps {
  savedAddress?: AddressResult | null
}

export function AddressForm(props: AddressFormProps) {
  const {
    form: { control },
    isDisabled,
    handleSubmitWithAction,
  } = useAddressForm(props)

  return (
    <form className='data-form' noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <div className='form-row'>
          <FormField autoComplete='given-name' control={control} label='Nombres' name='firstName' />
          <FormField autoComplete='family-name' control={control} label='Apellidos' name='lastName' />
        </div>
        <div className='form-row'>
          <FormField autoComplete='billing street-address' control={control} label='Dirección' name='address' />
          <FormField
            autoComplete='billing street-address'
            control={control}
            label='Dirección 2 (opcional)'
            name='address2'
            required={false}
          />
        </div>
        <div className='form-row'>
          <FormField autoComplete='postal-code' control={control} label='Código postal' name='postalCode' />
          <FormField autoComplete='address-level2' control={control} label='Ciudad' name='city' />
        </div>
        <div className='form-row'>
          <CountrySelect control={control} name='countryId' />
          <FormField autoComplete='tel' control={control} label='Teléfono' name='phone' type='tel' />
        </div>
        <RememberCheck control={control} name='remember' />
        <FormButtons.Submit className='w-fit' control={control}>
          Siguiente
        </FormButtons.Submit>
      </Fieldset>
    </form>
  )
}
