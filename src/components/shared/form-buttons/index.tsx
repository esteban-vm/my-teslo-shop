import { LinkButton } from './link'
import { GithubButton, GoogleButton } from './social'
import { SubmitButton } from './submit'

export function FormButtons() {}

FormButtons.Submit = SubmitButton
FormButtons.Link = LinkButton

FormButtons.Socials = () => {
  return (
    <>
      <GithubButton />
      <GoogleButton />
    </>
  )
}
