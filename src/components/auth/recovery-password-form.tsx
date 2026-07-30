'use client'

import { AtSign } from 'lucide-react'
import { Divider, Fieldset } from 'rsc-daisyui'
import { useRecoveryPasswordForm } from '@/hooks'
import { FormButtons, FormField } from '../shared'

export function RecoveryPasswordForm() {
  const {
    form: { control },
    isDisabled,
    handleSubmitWithAction,
  } = useRecoveryPasswordForm()

  return (
    <form className='auth-form' noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <Fieldset.Legend>Recuperar contraseña</Fieldset.Legend>
        <FormField
          autoComplete='home email'
          control={control}
          icon={<AtSign />}
          label='Correo electrónico'
          name='email'
          type='email'
        />
        <FormButtons.Submit control={control}>Recuperar contraseña</FormButtons.Submit>
        <Divider>O</Divider>
        <FormButtons.Link to='/auth/sign-in'>Iniciar sesión</FormButtons.Link>
      </Fieldset>
    </form>
  )
}
