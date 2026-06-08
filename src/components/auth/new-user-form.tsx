'use client'

import Link from 'next/link'
import { Button, Divider, Fieldset, Input } from 'rsc-daisyui'
import { AuthActions } from '@/actions'
import { ELLIPSIS_CHAR } from '@/lib/constants'
import { GithubIcon, GoogleIcon } from '../shared'

export function NewUserForm() {
  return (
    <form data-auth>
      <Fieldset>
        <Fieldset.Legend>Nuevo usuario</Fieldset.Legend>
        <Button onClick={() => AuthActions.signInWithGitHub()} size='sm' type='button'>
          <GithubIcon />
          Registrarse con GitHub
        </Button>
        <Button onClick={() => AuthActions.signInWithGoogle()} size='sm' type='button'>
          <GoogleIcon />
          Registrarse con Google
        </Button>
        <Divider>O</Divider>
        <Fieldset.Label htmlFor='name'>Nombre completo:</Fieldset.Label>
        <Input id='name' placeholder={ELLIPSIS_CHAR} size='sm' type='text' />
        <Fieldset.Label htmlFor='email'>Correo electrónico:</Fieldset.Label>
        <Input id='email' placeholder='correo@ejemplo.com' size='sm' type='email' />
        <Fieldset.Label htmlFor='password'>Contraseña:</Fieldset.Label>
        <Input id='password' placeholder='************' size='sm' type='password' />
        <Fieldset.Label htmlFor='repeat-password'>Repetir contraseña:</Fieldset.Label>
        <Input id='repeat-password' placeholder='************' size='sm' type='password' />
        <Button color='primary' size='sm' type='submit'>
          Registrarse
        </Button>
        <Divider>O</Divider>
        <Button as={Link} color='secondary' href='/auth/login' size='sm'>
          Iniciar sesión
        </Button>
      </Fieldset>
    </form>
  )
}
