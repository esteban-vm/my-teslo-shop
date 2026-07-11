'use client'

import { AtSign, LockKeyhole, Pencil } from 'lucide-react'
import { Divider, Fieldset } from 'rsc-daisyui'
import { useNewUserForm } from '@/hooks'
import { FormButtons, FormField } from '../shared'

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
        <FormButtons.Socials />
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
        <FormButtons.Submit control={control}>Registrarse</FormButtons.Submit>
        <Divider>O</Divider>
        <FormButtons.Link to='/auth/login'>Iniciar sesión</FormButtons.Link>
      </Fieldset>
    </form>
  )
}
