import { Search, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Button, Drawer, Input, Menu } from 'rsc-daisyui'

export function Sidebar({ drawerId }: { drawerId: string }) {
  return (
    <Drawer.Side as='aside' className='z-10 h-full' drawerId={drawerId}>
      <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' vanilla>
        <Menu.Title className='items-end'>
          <Button ghost shape='square' size='xs'>
            <XIcon className='stroke-current' />
          </Button>
        </Menu.Title>
        <Menu.Title>
          <Input as='label'>
            <Search />
            <input placeholder='Buscar' type='search' />
          </Input>
        </Menu.Title>
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            Hombres
          </Menu.Item>
        </Link>
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            Mujeres
          </Menu.Item>
        </Link>
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            Niños
          </Menu.Item>
        </Link>
      </Menu>
    </Drawer.Side>
  )
}
