import type { ProductFormProps } from '@/components/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { manageProduct } from '@/actions/product'
import { Toasts } from '@/lib/toasts'
import { ProductForm } from '@/schemas/product'

const initialProduct: ProductForm = {
  title: '',
  description: '',
  price: 0,
  stock: 0,
  sizes: [],
  gender: 'men',
  slug: '',
  tags: '',
  categoryId: '',
  uploads: null,
}

export function useProductForm({ savedProduct }: ProductFormProps) {
  const router = useRouter()
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(manageProduct, zodResolver(ProductForm), {
    formProps: {
      mode: 'all',
      defaultValues: {
        ...initialProduct,
        ...savedProduct,
        tags: savedProduct?.tags.join(', ') ?? initialProduct.tags,
      },
    },
    actionProps: {
      onExecute() {
        if (savedProduct) Toasts.execute('Actualizando producto')
        else Toasts.execute('Creando producto')
      },
      onSuccess(args) {
        if (savedProduct) Toasts.success('Producto actualizado')
        else Toasts.success('Producto creado')
        router.replace(`/product/${args.data.productSlug}`)
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
