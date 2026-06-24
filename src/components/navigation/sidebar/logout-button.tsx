'use client'

import { LogOutIcon } from 'lucide-react'
import { Menu } from 'rsc-daisyui'
import { AuthActions } from '@/actions'
import { closeSidebar } from '@/lib/ui'

export function LogoutButton() {
  const onLogout = () => {
    closeSidebar()
    AuthActions.logout()
  }

  return (
    <Menu.Item as='button' onClick={onLogout} type='button'>
      <LogOutIcon />
      Salir
    </Menu.Item>
  )
}
