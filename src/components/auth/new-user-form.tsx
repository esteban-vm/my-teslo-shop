'use client'

import { AtSign, LockKeyhole, Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button, Divider, Fieldset } from 'rsc-daisyui'
import { useNewUserForm } from '@/hooks'
import { FormField, SocialButtons, SubmitButton } from '../forms'

export function NewUserForm() {
  const {
    form: { control },
    isDisabled,
    handleSubmitWithAction,
  } = useNewUserForm()

  return (
    <form data-auth noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <Fieldset.Legend>Nuevo usuario</Fieldset.Legend>
        <SocialButtons.Github />
        <SocialButtons.Google />
        <Divider>O</Divider>
        <FormField control={control} icon={Pencil} label='Nombre completo' name='name' />
        <FormField control={control} icon={AtSign} inputMode='email' label='Correo electrónico' name='email' />
        <FormField control={control} icon={LockKeyhole} label='Contraseña' name='password' type='password' />
        <FormField
          control={control}
          icon={LockKeyhole}
          label='Repetir contraseña'
          name='repeatPassword'
          type='password'
        />
        <SubmitButton control={control}>Registrarse</SubmitButton>
        <Divider>O</Divider>
        <Button as={Link} color='secondary' href='/auth/login'>
          Iniciar sesión
        </Button>
      </Fieldset>
    </form>
  )
}
