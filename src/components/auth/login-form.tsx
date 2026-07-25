'use client'

import { AtSign, LockKeyhole } from 'lucide-react'
import { Divider, Fieldset } from 'rsc-daisyui'
import { useLoginForm } from '@/hooks'
import { FormButtons, FormField } from '../shared'

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
        <FormButtons.Socials />
        <Divider>O</Divider>
        <FormField
          autoComplete='home email'
          control={control}
          icon={<AtSign />}
          label='Correo electrónico'
          name='email'
          type='email'
        />
        <FormField
          control={control}
          icon={<LockKeyhole />}
          label='Contraseña'
          maxLength={20}
          name='password'
          type='password'
        />
        <FormButtons.Submit control={control}>Iniciar sesión</FormButtons.Submit>
        <Divider>O</Divider>
        <FormButtons.Link to='/auth/new-user'>Registrarse</FormButtons.Link>
        <Divider>O</Divider>
        <FormButtons.Link to='/auth/new-user'>Recuperar contraseña</FormButtons.Link>
      </Fieldset>
    </form>
  )
}
