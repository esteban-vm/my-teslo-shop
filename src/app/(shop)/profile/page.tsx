import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { CodeMockup } from 'rsc-daisyui'
import { PageTitle } from '@/components/shared'
import { getSession } from '@/lib/auth'
import { cn } from '@/lib/ui'

const title = 'Mi perfil'

export const metadata: Metadata = { title }

export type Props = PageProps<'/profile'>

export default async function Page() {
  const session = await getSession()
  if (!session) redirect('/auth/sign-in')

  const { name, email, role, emailVerified, createdAt } = session.user

  return (
    <>
      <PageTitle title={title} />
      <div className='mx-2 py-4'>
        <div className='motion-safe:aura aura-holo size-full rounded-lg'>
          <CodeMockup className='select-none rounded-lg xl:text-base'>
            <CodeMockup.Line className='font-semibold' prefix='$'>
              Mis datos
            </CodeMockup.Line>
            <CodeMockup.Line className='text-success' prefix='>'>
              <span className='font-semibold'>Nombre:</span> {name}
            </CodeMockup.Line>
            <CodeMockup.Line className='text-success' prefix='>'>
              <span className='font-semibold'>Correo electrónico:</span> {email}
            </CodeMockup.Line>
            <CodeMockup.Line className='text-success' prefix='>'>
              <span className='font-semibold'>Rol:</span> {role === 'admin' ? 'Administrador' : 'Usuario'}
            </CodeMockup.Line>
            <CodeMockup.Line className={cn(emailVerified ? 'text-success' : 'text-error')} prefix='>'>
              <span className='font-semibold'>¿Correo electrónico verificado?:</span> {emailVerified ? 'sí' : 'no'}
            </CodeMockup.Line>
            <CodeMockup.Line className='text-success' prefix='>'>
              <span className='font-semibold'>Registrado el:</span>&nbsp;
              {createdAt.toLocaleDateString('es', { dateStyle: 'full' })}
            </CodeMockup.Line>
          </CodeMockup>
        </div>
      </div>
    </>
  )
}
