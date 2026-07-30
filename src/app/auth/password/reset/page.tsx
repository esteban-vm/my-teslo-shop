import type { Metadata } from 'next'
import { ResetPasswordForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Restablecer contraseña',
}

export type Props = PageProps<'/auth/password/reset'>

export default function Page() {
  return <ResetPasswordForm />
}
