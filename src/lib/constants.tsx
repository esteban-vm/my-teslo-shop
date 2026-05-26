import type { NavLinkProps } from '@/app/_navigation/components'
import type { Gender } from '@/generated/prisma/client'
import { LogIn, LogOut, Shirt, Ticket, User, Users } from 'lucide-react'

// UI
export const DRAWER_ID = 'f16a4b28-58c6-41f1-9204-77a4ca50b77b'

// Pagination
export const ELLIPSIS_CHAR = '…'

// Navbar Links
export const navbarLinks: NavLinkProps<`/gender/${string}`>[] = [
  { text: 'Hombres', href: '/gender/men' },
  { text: 'Mujeres', href: '/gender/women' },
  { text: 'Niños', href: '/gender/kids' },
]

// Sidebar Links
export const sidebarLinks: NavLinkProps[] = [
  { text: 'Perfil', icon: <User /> },
  { text: 'Órdenes', icon: <Ticket /> },
  { text: 'Ingresar', icon: <LogIn /> },
  { text: 'Salir', icon: <LogOut /> },
  { text: 'Productos', icon: <Shirt /> },
  { text: 'Usuarios', icon: <Users /> },
]

export const genderMap: Record<Gender, string> = {
  men: 'hombres',
  women: 'mujeres',
  kids: 'niños',
  unisex: 'todos',
}
