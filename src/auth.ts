import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { userRoles } from './lib/constants'
import { sendEmail } from './lib/emails'
import { prisma } from './lib/prisma'
import { users } from './prisma/data'

export const auth = betterAuth({
  plugins: [nextCookies()],
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    async sendResetPassword({ user, url, token }) {
      console.log({ user, url, token })
    },
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      const isTestUser = users.some((u) => u.email === user.email)
      if (isTestUser) return

      await sendEmail({
        to: {
          name: user.name,
          address: user.email,
        },
        priority: 'high',
        subject: 'Verificación de correo electrónico',
        html: `
          <p>Verifica tu correo electrónico clicando el siguiente enlace:</p>
          <p>
            <a href="${url}" target="_blank" rel="noopener noreferrer">
              <b>Verificar correo electrónico</b>
            </a>
          </p>
        `,
      })
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  logger: {
    disabled: process.env.NODE_ENV === 'production',
  },
  user: {
    additionalFields: {
      role: {
        type: userRoles,
        required: false,
        defaultValue: userRoles[0],
        input: false,
      },
    },
  },
})
