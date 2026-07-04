'use client'

import { LogOutIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { Menu } from 'rsc-daisyui'
import { logout } from '@/actions/auth'
import { closeSidebar } from '@/lib/ui'

export function LogoutButton() {
  const { execute, isExecuting } = useAction(logout, {
    onNavigation() {
      closeSidebar()
    },
  })

  return (
    <Menu.Item as='button' disabled={isExecuting} onClick={() => execute()} type='button'>
      <LogOutIcon />
      Salir
    </Menu.Item>
  )
}
