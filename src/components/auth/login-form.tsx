'use client'

import { AtSign, LockKeyhole } from 'lucide-react'
import Link from 'next/link'
import { Button, Divider, Fieldset } from 'rsc-daisyui'
import { useLoginForm } from '@/hooks'
import { FormField, SocialButtons, SubmitButton } from '../forms'

export function LoginForm() {
  const {
    form: { control },
    isDisabled,
    handleSubmitWithAction,
  } = useLoginForm()

  return (
    <form data-auth noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <Fieldset.Legend>Iniciar sesión</Fieldset.Legend>
        <SocialButtons.Github />
        <SocialButtons.Google />
        <Divider>O</Divider>
        <FormField control={control} icon={AtSign} inputMode='email' label='Correo electrónico' name='email' />
        <FormField control={control} icon={LockKeyhole} label='Contraseña' name='password' type='password' />
        <SubmitButton control={control}>Iniciar sesión</SubmitButton>
        <Divider>O</Divider>
        <Button as={Link} color='secondary' href='/auth/new-user'>
          Registrarse
        </Button>
      </Fieldset>
    </form>
  )
}
