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
        <Fieldset.Legend>Registrarse</Fieldset.Legend>
        <SocialButtons.Github />
        <SocialButtons.Google />
        <Divider>O</Divider>
        <FormField autoComplete='name' control={control} icon={<Pencil />} label='Nombre completo' name='name' />
        <FormField
          autoComplete='email'
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
        <SubmitButton control={control}>Registrarse</SubmitButton>
        <Divider>O</Divider>
        <Button as={Link} color='secondary' disabled={isDisabled} href='/auth/login'>
          Iniciar sesión
        </Button>
      </Fieldset>
    </form>
  )
}
