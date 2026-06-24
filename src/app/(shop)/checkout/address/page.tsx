import type { Metadata } from 'next'
import { Button, Fieldset, Input, Label, Validator } from 'rsc-daisyui'
import { CountryActions } from '@/actions'
import { AddressForm } from '@/components/forms'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Dirección de entrega',
}

export default async function AddressPage() {
  const countries = await CountryActions.getCountries()

  return (
    <>
      <PageTitle title='Dirección' />
      <AddressForm countries={countries} />
      <form className='mx-auto w-full max-w-5xl px-5' noValidate>
        <Fieldset>
          <Fieldset.Legend className='mb-2'>Dirección de entrega</Fieldset.Legend>

          <div className='flex w-full flex-col lg:flex-row lg:gap-5'>
            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>Nombres:</span>
              <Input as='label' validator>
                <input placeholder='Nombres' required type='text' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>

            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>Apellidos:</span>
              <Input as='label' validator>
                <input placeholder='Apellidos' required type='text' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>
          </div>

          <div className='flex w-full flex-col lg:flex-row lg:gap-5'>
            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>Dirección:</span>
              <Input as='label' validator>
                <input placeholder='Dirección' required type='text' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>

            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>Dirección 2 (opcional):</span>
              <Input as='label' validator>
                <input placeholder='Dirección 2 (opcional)' type='text' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>
          </div>

          <div className='flex w-full flex-col lg:flex-row lg:gap-5'>
            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>Código postal:</span>
              <Input as='label' validator>
                <input placeholder='Código postal' required type='text' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>

            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>Ciudad:</span>
              <Input as='label' validator>
                <input placeholder='Ciudad' required type='text' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>
          </div>

          <div className='flex w-full flex-col lg:flex-row lg:gap-5'>
            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>País:</span>
              <Input as='label' validator>
                <input placeholder='País' required type='text' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>

            <Label.Floating as='div' className='w-full'>
              <span className='font-semibold'>Teléfono:</span>
              <Input as='label' validator>
                <input placeholder='Teléfono' required type='tel' />
              </Input>
              <Validator.Hint as='small' className='mt-1.5 empty:hidden' role='alert'>
                error
              </Validator.Hint>
            </Label.Floating>
          </div>

          <Button className='-mt-1 w-fit' color='primary' type='submit'>
            Siguiente
          </Button>
        </Fieldset>
      </form>
    </>
  )
}
