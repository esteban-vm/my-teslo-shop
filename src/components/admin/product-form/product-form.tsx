'use client'

import type { ProductResult } from '@/schemas/product'
import { Fieldset } from 'rsc-daisyui'
import { useProductForm } from '@/hooks'

export interface ProductFormProps {
  savedProduct?: ProductResult | null
}

export function ProductForm(props: ProductFormProps) {
  const { handleSubmitWithAction, isDisabled } = useProductForm(props)

  return (
    <form className='data-form' noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <div className='form-row'></div>
      </Fieldset>
    </form>
  )
}
