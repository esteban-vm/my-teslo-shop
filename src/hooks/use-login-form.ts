import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { login } from '@/actions/auth'
import { Toasts } from '@/lib/toasts'
import { Login } from '@/schemas/auth'

export function useLoginForm() {
  const [isServerError, setIsServerError] = useState(false)

  const methods = useHookFormAction(login, zodResolver(Login), {
    formProps: {
      mode: 'onChange',
      defaultValues: {
        email: '',
        password: '',
      },
    },
    actionProps: {
      onSettled() {
        methods.resetFormAndAction()
      },
      onExecute() {
        Toasts.execute('Ingresando')
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
