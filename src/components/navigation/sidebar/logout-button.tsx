'use client'

import { LogOutIcon } from 'lucide-react'
import { Menu } from 'rsc-daisyui'
import { Auth } from '@/actions'
import { closeSidebar } from '@/lib/ui'

export function LogoutButton() {
  const onLogout = () => {
    closeSidebar()
    Auth.logout()
  }

  return (
    <Menu.Item as='button' onClick={onLogout} type='button'>
      <LogOutIcon />
      Salir
    </Menu.Item>
  )
}
