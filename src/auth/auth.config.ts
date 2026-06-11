import type { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'

export const authConfig: NextAuthConfig = {
  trustHost: true,
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials as AuthSchemas.LoginSchema

        console.log({ email, password })

        return null
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
        console.error(error)
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
