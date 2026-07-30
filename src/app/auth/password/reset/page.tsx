import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restablecer contraseña',
}

export type Props = PageProps<'/auth/password/reset'>

export default function Page() {
  return <div>Restablecer contraseña</div>
}
