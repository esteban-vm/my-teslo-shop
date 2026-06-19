import { Frown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export function PageNotFound({ title = 'Página no encontrada' }: { title?: string }) {
  return (
    <Container>
      <ImageContainer>
        <Image alt={title} fill src='/imgs/not-found.png' />
      </ImageContainer>
      <div className='text-center font-montserrat text-error'>
        <h1 className='font-bold text-5xl'>
          404 <Frown className='inline size-12 fill-current/25 align-bottom' />
        </h1>
        <h2 className='font-semibold text-2xl'>{title}</h2>
        <Button as={Link} className='hover:opacity-75' color='info' href='/' link>
          Regresar al inicio
        </Button>
      </div>
    </Container>
  )
}

const Container = tw.div`-translate-1/2 absolute top-1/2 left-1/2 flex w-full flex-col items-center justify-evenly md:flex-row-reverse md:justify-center md:gap-4`
const ImageContainer = tw.div`relative aspect-square w-full max-w-md`
