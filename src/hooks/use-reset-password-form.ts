import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { resetPassword } from '@/actions/auth'
import { Toasts } from '@/lib/toasts'
import { WithPassword } from '@/schemas/auth'

export function useResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(resetPassword, zodResolver(WithPassword), {
    formProps: {
      mode: 'onChange',
      defaultValues: {
        password: '',
        repeatPassword: '',
        token: searchParams.get('token') ?? '',
      },
    },
    actionProps: {
      onExecute() {
        Toasts.execute('Restableciendo contraseña')
      },
      onSuccess(args) {
        setIsServerError(false)
        Toasts.success(args.data.message)
        router.push('/auth/sign-in')
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

  const { isSubmitting, isSubmitSuccessful } = hookReturn.form.formState
  const isDisabled = isSubmitting || (!isServerError && isSubmitSuccessful)

  return {
    ...hookReturn,
    isDisabled,
  }
}
