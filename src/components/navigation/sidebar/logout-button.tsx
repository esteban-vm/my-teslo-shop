'use client'

import { LogOut } from 'lucide-react'
import { Menu } from 'rsc-daisyui'
import { AuthActions } from '@/actions'
import { closeSidebar } from '@/lib/ui'

export function LogoutButton() {
  const onLogout = () => {
    closeSidebar()
    AuthActions.signOut()
  }

  return (
    <Menu.Item as='button' onClick={onLogout} type='button'>
      <LogOut />
      Salir
    </Menu.Item>
  )
}
