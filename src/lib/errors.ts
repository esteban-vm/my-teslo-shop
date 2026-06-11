import { CredentialsSignin } from 'next-auth'

export class CredentialsSigninError extends CredentialsSignin {
  code = 'credentials_error'

  get formattedMessage() {
    const { message } = this
    return message.substring(0, message.indexOf('. Read more'))
  }
}
