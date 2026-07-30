'use client'

import { LockKeyhole } from 'lucide-react'
import { Divider, Fieldset } from 'rsc-daisyui'
import { useResetPasswordForm } from '@/hooks'
import { FormButtons, FormField } from '../shared'

export function ResetPasswordForm() {
  const {
    form: { control },
    isDisabled,
    handleSubmitWithAction,
  } = useResetPasswordForm()

  return (
    <form className='auth-form' noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <Fieldset.Legend>Restablecer contraseña</Fieldset.Legend>
        <FormField control={control} icon={<LockKeyhole />} label='Contraseña' name='password' type='password' />
        <FormField
          control={control}
          icon={<LockKeyhole />}
          label='Repetir contraseña'
          name='repeatPassword'
          type='password'
        />
        <FormButtons.Submit control={control}>Restablecer contraseña</FormButtons.Submit>
        <Divider>O</Divider>
        <FormButtons.Link to='/auth/sign-in'>Iniciar sesión</FormButtons.Link>
      </Fieldset>
    </form>
  )
}
