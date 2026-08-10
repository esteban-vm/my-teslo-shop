import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { recoveryPassword } from '@/actions/auth'
import { Toasts } from '@/lib/toasts'
import { WithEmail } from '@/schemas/auth'

export function useRecoveryPasswordForm() {
  const router = useRouter()
  const [isServerError, setIsServerError] = useState(false)

  const hookReturn = useHookFormAction(recoveryPassword, zodResolver(WithEmail), {
    formProps: {
      mode: 'onChange',
      defaultValues: {
        email: '',
      },
    },
    actionProps: {
      onExecute() {
        Toasts.execute('Enviando correo')
      },
      onSuccess(args) {
        setIsServerError(false)
        Toasts.success(args.data.message, () => router.push('/'))
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
