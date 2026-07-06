'use client'

import { AtSign, LockKeyhole } from 'lucide-react'
import { Divider, Fieldset } from 'rsc-daisyui'
import { useLoginForm } from '@/hooks'
import { FormButton, FormField } from '../shared'

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
        <FormButton.Socials />
        <Divider>O</Divider>
        <FormField
          autoComplete='home email'
          control={control}
          icon={<AtSign />}
          label='Correo electrónico'
          name='email'
          type='email'
        />
        <FormField control={control} icon={<LockKeyhole />} label='Contraseña' name='password' type='password' />
        <FormButton.Submit control={control}>Iniciar sesión</FormButton.Submit>
        <Divider>O</Divider>
        <FormButton.Link disabled={isDisabled} to='/auth/new-user'>
          Registrarse
        </FormButton.Link>
        <Divider>O</Divider>
        <FormButton.Link disabled={isDisabled} to='/auth/new-user'>
          Recuperar contraseña
        </FormButton.Link>
      </Fieldset>
    </form>
  )
}
