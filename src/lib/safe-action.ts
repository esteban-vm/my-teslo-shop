import { CredentialsSignin } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'
import { Prisma } from '@/prisma/generated/client'

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof CredentialsSignin) {
      const { message } = error
      return message.substring(0, message.indexOf('. Read more'))
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { code, meta } = error

      if (code === 'P2002' && meta?.modelName === 'User') {
        return 'Correo electrónico en uso'
      }
    }

    return 'Ha ocurrido un error'
  },
})
