import { LogIn, LogOut, Search, Shirt, Ticket, User, Users, X } from 'lucide-react'
import Link from 'next/link'
import { Button, Drawer, Input, Menu } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export function Sidebar({ drawerId }: { drawerId: string }) {
  return (
    <Drawer.Side as='aside' className='z-10 h-full' drawerId={drawerId}>
      <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' vanilla>
        <Menu.Title className='items-end'>
          <Button ghost shape='square' size='xs'>
            <X className='stroke-current' />
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
        <Separator />
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            <User />
            Perfil
          </Menu.Item>
        </Link>
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            <Ticket />
            Órdenes
          </Menu.Item>
        </Link>
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            <LogIn />
            Ingresar
          </Menu.Item>
        </Link>
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            <LogOut />
            Salir
          </Menu.Item>
        </Link>
        <Separator />
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            <Shirt />
            Productos
          </Menu.Item>
        </Link>
        <Link href='/' passHref>
          <Menu.Item as='span' className='font-semibold'>
            <Users />
            Usuarios
          </Menu.Item>
        </Link>
      </Menu>
    </Drawer.Side>
  )
}

const Separator = tw.hr`mx-3 my-2 opacity-25`
