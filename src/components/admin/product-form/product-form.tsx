'use client'

import type { ProductResult } from '@/schemas/product'
import { Fieldset } from 'rsc-daisyui'
import { FormField } from '@/components/shared'
import { useProductForm } from '@/hooks'

export interface ProductFormProps {
  savedProduct?: ProductResult | null
}

export function ProductForm(props: ProductFormProps) {
  const {
    form: { control },
    handleSubmitWithAction,
    isDisabled,
  } = useProductForm(props)

  return (
    <form className='data-form' noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <div className='form-row'>
          <FormField control={control} label='Título' name='title' />
          <FormField control={control} label='Slug' name='slug' spellCheck={false} />
        </div>
      </Fieldset>
    </form>
  )
}
