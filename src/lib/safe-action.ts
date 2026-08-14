import { APIError } from 'better-auth'
import { createSafeActionClient } from 'next-safe-action'
import { Prisma } from '@/prisma/generated/client'
import { getSession } from './auth'
import { API_ERROR_MAP } from './constants'
import { ServerError } from './errors'

export const safeClient = createSafeActionClient({
  handleServerError(error) {
    console.log({ error: error.message })

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { code, meta } = error
      const isProduct = meta?.modelName === 'Product'

      if (code === 'P2002' && isProduct) {
        return 'El producto ya existe'
      }

      if (code === 'P2025' && isProduct) {
        return 'Producto no encontrado'
      }
    }

    if (error instanceof ServerError) {
      return error.message
    }

    if (error instanceof APIError) {
      const { status, statusCode } = error

      if (status === 'UNAUTHORIZED' && statusCode === 401) {
        return API_ERROR_MAP.invalidEmailOrPassword
      }

      if (status === 'FORBIDDEN' && statusCode === 403) {
        return API_ERROR_MAP.unverifiedEmail
      }

      if (status === 'UNPROCESSABLE_ENTITY' && statusCode === 422) {
        return API_ERROR_MAP.emailAlreadyInUse
      }
    }

    return 'Ha ocurrido un error'
  },
})

export const safeAuthClient = safeClient.use(async ({ next }) => {
  const session = await getSession()

  if (!session?.user) {
    throw new ServerError('No autenticado')
  }

  return next({ ctx: { user: session.user } })
})

export const safeAdminClient = safeAuthClient.use(async ({ ctx, next }) => {
  if (ctx.user.role === 'user') {
    throw new ServerError('No autorizado')
  }

  return next({ ctx: { user: ctx.user } })
})
