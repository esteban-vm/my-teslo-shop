import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createUser } from '@/actions/auth'
import { Toasts } from '@/lib/toasts'
import { UserDTO } from '@/schemas/auth'

export function useNewUserForm() {
  const router = useRouter()
  const [isServerError, setIsServerError] = useState(false)

  const methods = useHookFormAction(createUser, zodResolver(UserDTO), {
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
      onSuccess(args) {
        setIsServerError(false)
        const message = `Hemos enviado un correo de verificación a ${args.data.email}. Por favor, revíselo.`
        Toasts.success(message, () => router.push('/'))
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
