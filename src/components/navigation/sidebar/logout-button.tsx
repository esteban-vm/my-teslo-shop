'use client'

import { LogOut } from 'lucide-react'
import { Menu } from 'rsc-daisyui'
import { AuthActions } from '@/actions'

export function LogoutButton() {
  return (
    <Menu.Item as='button' onClick={() => AuthActions.signOut()} type='button'>
      <LogOut />
      Salir
    </Menu.Item>
  )
}
