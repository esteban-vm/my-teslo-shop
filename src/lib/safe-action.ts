import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action'
import { CredentialsSigninError } from './errors'

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof CredentialsSigninError) {
      return error.formattedMessage
    }

    if (process.env.NODE_ENV === 'development') {
      return error.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})
