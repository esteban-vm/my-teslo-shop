import type { BillingAddress } from '@/prisma/generated/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { AddressActions } from '@/actions'
import { Toasts } from '@/lib/toasts'
import { AddressDTO } from '@/schemas/address'
import { useAddressStore } from './use-address-store'

export interface AddressFormProps {
  savedAddress?: BillingAddress
}

export function useAddressForm({ savedAddress }: AddressFormProps) {
  const address = useAddressStore((s) => s.address)
  const setAddress = useAddressStore((s) => s.setAddress)
  const [isServerError, setIsServerError] = useState(false)

  const methods = useHookFormAction(AddressActions.manageAddress, zodResolver(AddressDTO), {
    formProps: {
      mode: 'all',
      defaultValues: {
        ...address,
        ...savedAddress,
      },
    },
    actionProps: {
      onSettled() {
        methods.resetFormAndAction()
      },
      onExecute({ input }) {
        setAddress(input)
        Toasts.execute('Un momento')
      },
      onSuccess() {
        setIsServerError(false)
      },
      onError(args) {
        const { serverError } = args.error

        if (serverError) {
          setIsServerError(true)
          Toasts.error(serverError)
        }
      },
      onNavigation() {
        Toasts.close()
      },
    },
  })

  const { isSubmitting, isSubmitSuccessful } = methods.form.formState

  return {
    ...methods,
    isDisabled: isSubmitting || (!isServerError && isSubmitSuccessful),
  }
}
