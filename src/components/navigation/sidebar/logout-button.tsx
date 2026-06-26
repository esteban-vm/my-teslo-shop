'use client'

import { LogOutIcon } from 'lucide-react'
import { Menu } from 'rsc-daisyui'
import { logout } from '@/actions/auth'
import { closeSidebar } from '@/lib/ui'

export function LogoutButton() {
  const onLogout = () => {
    closeSidebar()
    logout()
  }

  return (
    <Menu.Item as='button' onClick={onLogout} type='button'>
      <LogOutIcon />
      Salir
    </Menu.Item>
  )
}
