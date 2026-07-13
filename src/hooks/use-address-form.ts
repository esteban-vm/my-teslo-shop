import type { AddressFormProps } from '@/components/checkout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useEffect, useState } from 'react'
import { manageAddress } from '@/actions/address'
import { Toasts } from '@/lib/toasts'
import { Address } from '@/schemas/address'
import { useAddressStore } from './use-address-store'

export function useAddressForm({ savedAddress }: AddressFormProps) {
  const address = useAddressStore((s) => s.address)
  const setAddress = useAddressStore((s) => s.setAddress)
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(manageAddress, zodResolver(Address), {
    formProps: {
      mode: 'all',
      defaultValues: {
        ...address,
        ...savedAddress,
      },
    },
    actionProps: {
      onSettled() {
        hookReturn.resetFormAndAction()
      },
      onExecute(args) {
        setAddress(args.input)
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

  const { reset, formState } = hookReturn.form
  const { isSubmitting, isSubmitSuccessful } = formState
  const isDisabled = isSubmitting || (!isServerError && isSubmitSuccessful)

  useEffect(() => {
    if (address.firstName && !isDisabled) {
      reset(address)
    }
  }, [address, reset, isDisabled])

  return {
    ...hookReturn,
    isDisabled,
  }
}
