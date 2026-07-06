import { APIError } from 'better-auth'
import { headers } from 'next/headers'
import { createSafeActionClient } from 'next-safe-action'
import { auth } from '@/auth'

export const safeClient = createSafeActionClient({
  handleServerError(error) {
    if (process.env.NODE_ENV === 'development') {
      console.log({ error: error.message })
    }

    if (error instanceof APIError) {
      const { status, statusCode } = error

      if (status === 'UNAUTHORIZED' && statusCode === 401) {
        return 'Correo electrónico y/o contraseña inválido(s)'
      }

      if (status === 'FORBIDDEN' && statusCode === 403) {
        return 'Correo electrónico no verificado'
      }

      if (status === 'UNPROCESSABLE_ENTITY' && statusCode === 422) {
        return 'El correo electrónico ya está en uso'
      }
    }

    return 'Ha ocurrido un error'
  },
})

export const safeAuthClient = safeClient.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    throw new Error('Acceso no autorizado')
  }

  return next({ ctx: { user: session.user } })
})
