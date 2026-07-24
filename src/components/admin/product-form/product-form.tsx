'use client'

import type { ProductResult } from '@/schemas/product'
import { Fieldset } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { useProductForm } from '@/hooks'

export interface ProductFormProps {
  savedProduct: ProductResult
}

export function ProductForm(props: ProductFormProps) {
  useProductForm(props)

  return (
    <Container noValidate>
      <Fieldset className='pt-3.5'></Fieldset>
    </Container>
  )
}

const Container = tw.form`mx-auto my-3 w-full max-w-5xl px-5`
