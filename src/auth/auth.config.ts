import type { NextAuthConfig } from 'next-auth'
import type { Login } from '@/schemas/auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'

export const authConfig: NextAuthConfig = {
  trustHost: true,
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as Login

        const savedUser = await prisma.user.findUnique({
          where: { email: email.toLowerCase(), active: true },
          omit: { password: false },
        })

        const isLoggedIn = await compare(password, savedUser?.password ?? '')

        if (!savedUser || !isLoggedIn) {
          throw new CredentialsSignin('Correo electrónico y/o contraseña inválido(s)')
        }

        const { password: _, ...loggedInUser } = savedUser
        return loggedInUser
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 604_800, // 7 días
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }

      return token
    },

    session({ token, session }) {
      session.user = token.data
      return session
    },
  },

  logger: {
    error(error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error.message)
      }
    },

    warn(code) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(code)
      }
    },

    debug(message) {
      if (process.env.NODE_ENV === 'development') {
        console.debug(message)
      }
    },
  },
}
