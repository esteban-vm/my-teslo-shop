import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useState } from 'react'
import { signIn } from '@/actions/auth'
import { API_ERROR_MAP } from '@/lib/constants'
import { Toasts } from '@/lib/toasts'
import { SignIn } from '@/schemas/auth'

export function useSignInForm() {
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(signIn, zodResolver(SignIn), {
    formProps: {
      mode: 'onChange',
      defaultValues: {
        email: '',
        password: '',
      },
    },
    actionProps: {
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

        if (serverError === API_ERROR_MAP.unverifiedEmail) {
          const { authClient } = await import('@/auth-client')
          void authClient.sendVerificationEmail({ email: args.input.email })
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
