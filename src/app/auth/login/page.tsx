import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
}

export type Props = PageProps<'/auth/login'>

export default function Page() {
  return <LoginForm />
}
