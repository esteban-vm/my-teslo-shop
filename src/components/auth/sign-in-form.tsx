'use client'

import { AtSign, LockKeyhole } from 'lucide-react'
import { Divider, Fieldset } from 'rsc-daisyui'
import { useSignInForm } from '@/hooks'
import { FormButtons, FormField } from '../shared'

export function SignInForm() {
  const {
    form: { control },
    isDisabled,
    handleSubmitWithAction,
  } = useSignInForm()

  return (
    <form className='auth-form' noValidate onSubmit={handleSubmitWithAction}>
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
        <FormField control={control} icon={<LockKeyhole />} label='Contraseña' name='password' type='password' />
        <FormButtons.Submit control={control}>Iniciar sesión</FormButtons.Submit>
        <Divider>O</Divider>
        <FormButtons.Link to='/auth/sign-up'>Registrarse</FormButtons.Link>
        <Divider>O</Divider>
        <FormButtons.Link to='/auth/sign-up'>Recuperar contraseña</FormButtons.Link>
      </Fieldset>
    </form>
  )
}
