'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Menu } from 'rsc-daisyui'
import { authClient } from '@/auth-client'
import { closeSidebar } from '@/lib/ui'

export function LogoutButton() {
  const router = useRouter()

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onRequest() {
          closeSidebar()
        },
        onSuccess() {
          router.replace('/')
          router.refresh()
        },
      },
    })
  }

  return (
    <Menu.Item as='button' onClick={onLogout} type='button'>
      <LogOutIcon />
      Salir
    </Menu.Item>
  )
}
