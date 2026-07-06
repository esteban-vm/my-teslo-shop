import { LinkButton } from './link'
import { GithubButton, GoogleButton } from './social'
import { SubmitButton } from './submit'

export function FormButton() {}

FormButton.Submit = SubmitButton
FormButton.Link = LinkButton

FormButton.Socials = () => {
  return (
    <>
      <GithubButton />
      <GoogleButton />
    </>
  )
}
