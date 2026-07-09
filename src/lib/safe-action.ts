import { APIError } from 'better-auth'
import { headers } from 'next/headers'
import { createSafeActionClient } from 'next-safe-action'
import { auth } from '@/auth'
import { ApiErrorMap } from './constants'
import { ServerError } from './errors'

export const safeClient = createSafeActionClient({
  handleServerError(error) {
    console.log({ error: error.message })

    if (error instanceof ServerError) {
      return error.message
    }

    if (error instanceof APIError) {
      const { status, statusCode } = error

      if (status === 'UNAUTHORIZED' && statusCode === 401) {
        return ApiErrorMap.invalidEmailOrPassword
      }

      if (status === 'FORBIDDEN' && statusCode === 403) {
        return ApiErrorMap.unverifiedEmail
      }

      if (status === 'UNPROCESSABLE_ENTITY' && statusCode === 422) {
        return ApiErrorMap.emailAlreadyInUse
      }
    }

    return ApiErrorMap.default
  },
})

export const safeAuthClient = safeClient.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    throw new Error('Acceso no autorizado')
  }

  return next({ ctx: { user: session.user } })
})
