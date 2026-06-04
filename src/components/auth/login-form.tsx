'use client'

import Link from 'next/link'
import { Button, Divider, Fieldset, Input } from 'rsc-daisyui'
import { GithubIcon, GoogleIcon } from '../shared'

export function LoginForm() {
  return (
    <form data-auth>
      <Fieldset>
        <Fieldset.Legend>Iniciar sesión</Fieldset.Legend>
        <Button className='border-black bg-black text-white' size='sm' type='button'>
          <GithubIcon />
          Ingresar con GitHub
        </Button>
        <Button className='border-base-300 bg-white text-black' size='sm' type='button'>
          <GoogleIcon />
          Ingresar con Google
        </Button>
        <Divider className='m-0 text-xs'>O</Divider>
        <Fieldset.Label htmlFor='email'>Correo electrónico:</Fieldset.Label>
        <Input className='w-full' id='email' placeholder='correo@ejemplo.com' size='sm' type='email' />
        <Fieldset.Label htmlFor='password'>Contraseña:</Fieldset.Label>
        <Input className='w-full' id='password' placeholder='************' size='sm' type='password' />
        <Button className='mt-2' color='primary' size='sm' type='submit'>
          Iniciar sesión
        </Button>
        <Divider className='m-0 text-xs'>O</Divider>
        <Button as={Link} color='secondary' href='/auth/new-account' size='sm'>
          Crear cuenta nueva
        </Button>
      </Fieldset>
    </form>
  )
}
