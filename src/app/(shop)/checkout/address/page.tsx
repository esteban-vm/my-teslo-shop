import type { Metadata } from 'next'
import { PageTitle } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Dirección de entrega',
}

export default function AddressPage() {
  return (
    <>
      <PageTitle subtitle='Dirección de entrega' title='Dirección' />
      <div className='my-3 flex flex-col gap-3 lg:flex-row'>
        <div className='h-32 w-full bg-accent px-5'></div>
        <div className='h-32 w-full bg-accent px-5'></div>
      </div>
    </>
  )
}
