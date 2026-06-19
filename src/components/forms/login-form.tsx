'use client'

import { AtSign, LockKeyhole } from 'lucide-react'
import Link from 'next/link'
import { Button, Divider, Fieldset } from 'rsc-daisyui'
import { useLoginForm } from '@/hooks'
import { FormField, SocialButtons, SubmitButton } from '../shared'

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
        <FormField
          autoComplete='email'
          control={control}
          icon={<AtSign />}
          label='Correo electrónico'
          name='email'
          type='email'
        />
        <FormField control={control} icon={<LockKeyhole />} label='Contraseña' name='password' type='password' />
        <SubmitButton control={control}>Iniciar sesión</SubmitButton>
        <Divider>O</Divider>
        <Button as={Link} color='secondary' disabled={isDisabled} href='/auth/new-user'>
          Registrarse
        </Button>
      </Fieldset>
    </form>
  )
}
