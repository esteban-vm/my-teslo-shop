import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { login } from '@/actions/auth'
import { ServerErrorMap } from '@/lib/constants'
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
      async onError(args) {
        const { serverError } = args.error
        if (!serverError) return

        setIsServerError(true)
        Toasts.error(serverError)

        if (serverError === ServerErrorMap.unverifiedEmail) {
          const { authClient } = await import('@/auth-client')
          authClient.sendVerificationEmail({ email: args.input.email })
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
