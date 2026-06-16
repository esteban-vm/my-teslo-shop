import type { NextAuthConfig } from 'next-auth'
import type { AuthSchemas } from '@/schemas'
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
        const { email, password } = credentials as AuthSchemas.LoginSchema

        const savedUser = await prisma.user.findUnique({
          where: { email, active: true },
          omit: { password: false },
        })

        const isLogged = await compare(password, savedUser?.password ?? '')

        if (!savedUser || !isLogged) {
          throw new CredentialsSignin('Correo electrónico y/o contraseña inválido(s)')
        }

        const { password: _, ...loggedUser } = savedUser
        return loggedUser
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 604_800, // 7 días
  },

  callbacks: {
    // jwt({ token }) {
    //   // console.log({ token })
    //   return token
    // },
    // session({ session, token }) {
    //   console.log({ token })
    //   // console.log({ session })
    //   return session
    // },
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
