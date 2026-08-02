import type { ProductFormProps } from '@/components/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { manageProduct } from '@/actions/product'
import { Toasts } from '@/lib/toasts'
import { ProductDTO } from '@/schemas/product'

const initialProduct: ProductDTO = {
  id: '',
  title: '',
  description: '',
  price: 0,
  stock: 0,
  sizes: [],
  gender: 'unisex',
  slug: '',
  tags: '',
  categoryId: '',
}

export function useProductForm({ savedProduct }: ProductFormProps) {
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(manageProduct, zodResolver(ProductDTO), {
    formProps: {
      mode: 'all',
      defaultValues: {
        ...initialProduct,
        ...savedProduct,
        tags: savedProduct?.tags.join(', ') ?? initialProduct.tags,
      },
    },
    actionProps: {
      onSettled() {
        hookReturn.resetFormAndAction()
      },
      onExecute() {
        Toasts.execute('Un momento')
      },
      onSuccess() {
        setIsServerError(false)
      },
      onError(args) {
        const { serverError } = args.error
        if (!serverError) return
        setIsServerError(true)
        Toasts.error(serverError)
      },
      onNavigation() {
        Toasts.close()
      },
    },
  })

  const { formState } = hookReturn.form
  const { isSubmitting, isSubmitSuccessful } = formState
  const isDisabled = isSubmitting || (!isServerError && isSubmitSuccessful)

  return {
    ...hookReturn,
    isDisabled,
  }
}
