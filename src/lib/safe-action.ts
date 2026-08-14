import { betterAuth } from '@next-safe-action/adapter-better-auth'
import { APIError } from 'better-auth'
import { unauthorized } from 'next/navigation'
import { createSafeActionClient } from 'next-safe-action'
import { auth } from '@/auth'
import { Prisma } from '@/prisma/generated/client'
import { API_ERROR_MAP } from './constants'
import { ServerError } from './errors'

export const safeClient = createSafeActionClient({
  handleServerError(error) {
    console.log({ error: error.message })

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { code, meta } = error

      const isProduct = meta?.modelName === 'Product'
      const isOrder = meta?.modelName === 'Order'
      const isAddress = meta?.modelName === 'BillingAddress'

      if (code === 'P2002' && isProduct) {
        return 'El producto ya existe'
      }

      if (code === 'P2025') {
        if (isProduct) {
          return 'Producto no encontrado'
        }

        if (isOrder) {
          return 'Orden no encontrada'
        }

        if (isAddress) {
          return 'Dirección no encontrada'
        }
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

export const safeAuthClient = safeClient.use(betterAuth(auth))

export const safeAdminClient = safeClient.use(
  betterAuth(auth, {
    authorize({ authData, next }) {
      if (!authData || authData.user.role !== 'admin') {
        unauthorized()
      }

      return next({ ctx: { auth: authData } })
    },
  })
)
