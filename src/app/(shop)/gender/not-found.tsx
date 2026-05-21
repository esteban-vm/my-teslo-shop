import { Frown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export default function NotFoundGenderPage() {
  return (
    <PageContainer>
      <div className='relative aspect-square w-full max-w-md'>
        <Image alt='Género no encontrado' fill src='/imgs/not-found.png' />
      </div>
      <div className='text-center font-montserrat text-error'>
        <h1 className='font-bold text-5xl'>
          404 <Frown className='inline size-12 fill-current/25 align-bottom' />
        </h1>
        <h2 className='font-semibold text-2xl'>Género no encontrado</h2>
        <Button as={Link} className='hover:opacity-75' color='info' href='/' link>
          Regresar al inicio
        </Button>
      </div>
    </PageContainer>
  )
}

const PageContainer = tw.div`-translate-1/2 absolute top-1/2 left-1/2 flex w-full flex-col items-center justify-evenly md:flex-row-reverse md:justify-center md:gap-4`
