import { redirect } from 'next/navigation'
import { Hero } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { getSession } from '@/lib/auth'

export type Props = LayoutProps<'/auth'>

export default async function Layout({ children }: Props) {
  const session = await getSession()
  if (session?.user) redirect('/')

  return (
    <Hero className='min-h-screen bg-base-200'>
      <Hero.Content className='flex-col md:flex-row-reverse'>
        <div className='text-center md:text-left'>
          <Title>Teslo | Shop</Title>
          <Paragraph>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
            deleniti eaque aut repudiandae et a id nisi.
          </Paragraph>
        </div>
        {children}
      </Hero.Content>
    </Hero>
  )
}

const Title = tw.h1`font-montserrat font-semibold text-4xl text-rose-700 xl:text-5xl`
const Paragraph = tw.p`text-pretty pt-6 not-xl:pb-6 text-sm xl:text-base`
