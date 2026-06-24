import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { AddressActions } from '@/actions'
import { AddressSchemas } from '@/schemas'

export function useAddressForm() {
  const [isServerError, setIsServerError] = useState(false)

  const methods = useHookFormAction(AddressActions.setAddress, zodResolver(AddressSchemas.AddressDTO), {
    formProps: {
      mode: 'all',
      defaultValues: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        phone: '',
        city: '',
        countryId: '',
        remember: false,
      },
    },
    actionProps: {
      onSettled() {
        methods.resetFormAndAction()
      },
      onExecute() {},
      onSuccess() {
        setIsServerError(false)
      },
      onError(args) {
        const { serverError } = args.error

        if (serverError) {
          setIsServerError(true)
        }
      },
      onNavigation() {},
    },
  })

  const { isSubmitting, isSubmitSuccessful } = methods.form.formState

  return {
    ...methods,
    isDisabled: isSubmitting || (!isServerError && isSubmitSuccessful),
  }
}
