import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { sendEmail } from '@/lib/emails'
import { prisma } from '@/lib/prisma'

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
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
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
  user: {
    additionalFields: {
      role: {
        type: ['client', 'admin'],
        required: false,
        defaultValue: 'client',
        input: false,
      },
    },
  },
})
