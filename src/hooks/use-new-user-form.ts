import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { AuthActions } from '@/actions'
import { Toasts } from '@/lib/toasts'
import { AuthSchemas } from '@/schemas'

export function useNewUserForm() {
  const [isServerError, setIsServerError] = useState(false)

  const methods = useHookFormAction(AuthActions.createUser, zodResolver(AuthSchemas.UserDTO), {
    formProps: {
      mode: 'onChange',
      defaultValues: {
        email: '',
        name: '',
        password: '',
        repeatPassword: '',
      },
    },
    actionProps: {
      onSettled() {
        methods.resetFormAndAction()
      },
      onExecute() {
        Toasts.execute('Registrando')
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
