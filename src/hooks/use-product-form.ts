import type { ProductFormProps } from '@/components/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { manageProduct } from '@/actions/product'
import { Toasts } from '@/lib/toasts'
import { ProductDTO } from '@/schemas/product'

export function useProductForm({ savedProduct }: ProductFormProps) {
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(manageProduct, zodResolver(ProductDTO), {
    formProps: {
      mode: 'all',
      defaultValues: {
        ...savedProduct,
        tags: savedProduct?.tags.join(', '),
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
