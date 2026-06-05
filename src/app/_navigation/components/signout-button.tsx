'use client'

import { LogOut } from 'lucide-react'
import { Button } from 'rsc-daisyui'
import { AuthActions } from '@/actions'

export function SignOutButton() {
  return (
    <Button ghost onClick={() => AuthActions.signOut()} shape='square' size='sm' type='button'>
      <LogOut />
    </Button>
  )
}
