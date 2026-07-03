import { headers } from 'next/headers'
import { createSafeActionClient } from 'next-safe-action'
import { auth } from '@/auth'
import { Prisma } from '@/prisma/generated/client'

export const safeClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { code, meta } = error

      if (code === 'P2002' && meta?.modelName === 'User') {
        return 'Correo electrónico en uso'
      }
    }

    return error.message
  },
})

export const safeAuthClient = safeClient.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    throw new Error('Acceso no autorizado')
  }

  return next({ ctx: { user: session.user } })
})
