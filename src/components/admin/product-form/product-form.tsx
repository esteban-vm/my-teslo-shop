'use client'

import type { ProductResult } from '@/schemas/product'
import { Fieldset } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { useProductForm } from '@/hooks'

export interface ProductFormProps {
  savedProduct?: ProductResult | null
}

export function ProductForm(props: ProductFormProps) {
  const { handleSubmitWithAction, isDisabled } = useProductForm(props)

  return (
    <Container noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset className='pt-3.5' disabled={isDisabled}>
        <Row></Row>
      </Fieldset>
    </Container>
  )
}

const Container = tw.form`mx-auto my-3 w-full max-w-5xl px-5`
const Row = tw.div`flex w-full flex-col lg:flex-row lg:gap-5`
