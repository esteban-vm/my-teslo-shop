import { createSafeActionClient } from 'next-safe-action'
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

export const safeAuthClient = safeClient.use(({ next }) => {
  return next({ ctx: { user: { id: '' } } })
})
