import type { Metadata } from 'next'
import { SignInForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
}

export type Props = PageProps<'/auth/sign-in'>

export default function Page() {
  return <SignInForm />
}
