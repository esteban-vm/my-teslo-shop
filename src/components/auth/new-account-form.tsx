'use client'

import Link from 'next/link'
import { Button, Divider, Fieldset, Input } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'
import { GithubIcon, GoogleIcon } from '../shared'

export function NewAccountForm() {
  return (
    <form data-auth>
      <Fieldset>
        <Fieldset.Legend>Crear cuenta</Fieldset.Legend>
        <Button className='border-black bg-black text-white' size='sm' type='button'>
          <GithubIcon />
          Registrarse con GitHub
        </Button>
        <Button className='border-[#e5e5e5] bg-white text-black' size='sm' type='button'>
          <GoogleIcon />
          Registrarse con Google
        </Button>
        <Divider className='m-0 text-xs'>O</Divider>
        <Fieldset.Label htmlFor='name'>Nombre completo:</Fieldset.Label>
        <Input className='w-full' id='name' placeholder={ELLIPSIS_CHAR} size='sm' type='text' />
        <Fieldset.Label htmlFor='email'>Correo electrónico:</Fieldset.Label>
        <Input className='w-full' id='email' placeholder='correo@ejemplo.com' size='sm' type='email' />
        <Fieldset.Label htmlFor='password'>Contraseña:</Fieldset.Label>
        <Input className='w-full' id='password' placeholder='************' size='sm' type='password' />
        <Fieldset.Label htmlFor='repeat-password'>Repetir contraseña:</Fieldset.Label>
        <Input className='w-full' id='repeat-password' placeholder='************' size='sm' type='password' />
        <Button className='mt-2' color='primary' size='sm' type='submit'>
          Crear cuenta
        </Button>
        <Divider className='m-0 text-xs'>O</Divider>
        <Button as={Link} color='secondary' href='/auth/login' size='sm'>
          Iniciar sesión
        </Button>
      </Fieldset>
    </form>
  )
}
