import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { login } from '@/actions/auth'
import { ApiErrorMap } from '@/lib/constants'
import { Toasts } from '@/lib/toasts'
import { Login } from '@/schemas/auth'

export function useLoginForm() {
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(login, zodResolver(Login), {
    formProps: {
      mode: 'onChange',
      defaultValues: {
        email: '',
        password: '',
      },
    },
    actionProps: {
      onSettled() {
        hookReturn.resetFormAndAction()
      },
      onExecute() {
        Toasts.execute('Ingresando')
      },
      onSuccess() {
        setIsServerError(false)
      },
      async onError(args) {
        const { serverError } = args.error
        if (!serverError) return
        setIsServerError(true)
        Toasts.error(serverError)

        if (serverError === ApiErrorMap.unverifiedEmail) {
          const { authClient } = await import('@/auth-client')
          authClient.sendVerificationEmail({ email: args.input.email })
        }
      },
      onNavigation() {
        Toasts.close()
      },
    },
  })

  const { isSubmitting, isSubmitSuccessful } = hookReturn.form.formState
  const isDisabled = isSubmitting || (!isServerError && isSubmitSuccessful)

  return {
    ...hookReturn,
    isDisabled,
  }
}
