'use client'

import type { AddressFormProps } from '@/hooks'
import { useEffect } from 'react'
import { Fieldset } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { useAddressForm, useAddressStore } from '@/hooks'
import { CountrySelect, FormButton, FormField, RememberCheck } from '../shared'

export function AddressForm(props: AddressFormProps) {
  const address = useAddressStore((s) => s.address)

  const {
    form: { control, reset },
    isDisabled,
    handleSubmitWithAction,
  } = useAddressForm(props)

  useEffect(() => {
    if (address.firstName && !isDisabled) {
      reset(address)
    }
  }, [address, reset, isDisabled])

  return (
    <Container noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <Fieldset.Legend>Dirección de facturación</Fieldset.Legend>
        <Row>
          <FormField autoComplete='given-name' control={control} label='Nombres' name='firstName' />
          <FormField autoComplete='family-name' control={control} label='Apellidos' name='lastName' />
        </Row>
        <Row>
          <FormField autoComplete='billing street-address' control={control} label='Dirección' name='address' />
          <FormField
            autoComplete='billing street-address'
            control={control}
            label='Dirección 2 (opcional)'
            name='address2'
            required={false}
          />
        </Row>
        <Row>
          <FormField autoComplete='postal-code' control={control} label='Código postal' name='postalCode' />
          <FormField autoComplete='address-level2' control={control} label='Ciudad' name='city' />
        </Row>
        <Row>
          <CountrySelect control={control} name='countryId' />
          <FormField autoComplete='tel' control={control} label='Teléfono' name='phone' type='tel' />
        </Row>
        <RememberCheck control={control} name='remember' />
        <FormButton.Submit className='w-fit' control={control}>
          Siguiente
        </FormButton.Submit>
      </Fieldset>
    </Container>
  )
}

const Container = tw.form`mx-auto mb-3 w-full max-w-5xl px-5`
const Row = tw.div`flex w-full flex-col lg:flex-row lg:gap-5`
