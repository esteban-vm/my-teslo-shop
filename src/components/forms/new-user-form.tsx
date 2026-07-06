'use client'

import { AtSign, LockKeyhole, Pencil } from 'lucide-react'
import { Divider, Fieldset } from 'rsc-daisyui'
import { useNewUserForm } from '@/hooks'
import { FormButton, FormField } from '../shared'

export function NewUserForm() {
  const {
    form: { control },
    isDisabled,
    handleSubmitWithAction,
  } = useNewUserForm()

  return (
    <form data-auth noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <Fieldset.Legend>Registrarse</Fieldset.Legend>
        <FormButton.Socials />
        <Divider>O</Divider>
        <FormField autoComplete='name' control={control} icon={<Pencil />} label='Nombre completo' name='name' />
        <FormField
          autoComplete='home email'
          control={control}
          icon={<AtSign />}
          label='Correo electrónico'
          name='email'
          type='email'
        />
        <FormField control={control} icon={<LockKeyhole />} label='Contraseña' name='password' type='password' />
        <FormField
          control={control}
          icon={<LockKeyhole />}
          label='Repetir contraseña'
          name='repeatPassword'
          type='password'
        />
        <FormButton.Submit control={control}>Registrarse</FormButton.Submit>
        <Divider>O</Divider>
        <FormButton.Link disabled={isDisabled} to='/auth/login'>
          Iniciar sesión
        </FormButton.Link>
      </Fieldset>
    </form>
  )
}
