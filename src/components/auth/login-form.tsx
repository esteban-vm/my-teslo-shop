'use client'

import Link from 'next/link'
import { Button, Divider, Fieldset, Input } from 'rsc-daisyui'
import { AuthActions } from '@/actions'
import { GithubIcon, GoogleIcon } from '../shared'

export function LoginForm() {
  return (
    <form data-auth>
      <Fieldset>
        <Fieldset.Legend>Iniciar sesión</Fieldset.Legend>
        <Button onClick={() => AuthActions.signInWithGitHub()} size='sm' type='button'>
          <GithubIcon />
          Ingresar con GitHub
        </Button>
        <Button onClick={() => AuthActions.signInWithGoogle()} size='sm' type='button'>
          <GoogleIcon />
          Ingresar con Google
        </Button>
        <Divider>O</Divider>
        <Fieldset.Label htmlFor='email'>Correo electrónico:</Fieldset.Label>
        <Input id='email' placeholder='correo@ejemplo.com' size='sm' type='email' />
        <Fieldset.Label htmlFor='password'>Contraseña:</Fieldset.Label>
        <Input id='password' placeholder='************' size='sm' type='password' />
        <Button color='primary' size='sm' type='submit'>
          Iniciar sesión
        </Button>
        <Divider>O</Divider>
        <Button as={Link} color='secondary' href='/auth/new-account' size='sm'>
          Crear cuenta
        </Button>
      </Fieldset>
    </form>
  )
}
