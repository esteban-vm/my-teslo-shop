'use client'

import { Button } from 'rsc-daisyui'
import { AuthActions } from '@/actions'

export function SocialButtons() {}

SocialButtons.Github = GithubButton
SocialButtons.Google = GoogleButton

function GithubButton() {
  return (
    <Button className='border-black bg-black text-white' onClick={() => AuthActions.loginWithGitHub()} type='button'>
      <GithubIcon />
      Ingresar con GitHub
    </Button>
  )
}

function GoogleButton() {
  return (
    <Button className='border-base-300 bg-white text-black' onClick={() => AuthActions.loginWithGoogle()} type='button'>
      <GoogleIcon />
      Ingresar con Google
    </Button>
  )
}

function GithubIcon() {
  return (
    <svg aria-label='GitHub logo' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z'
        fill='white'
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg aria-label='Google logo' height='16' viewBox='0 0 512 512' width='16' xmlns='http://www.w3.org/2000/svg'>
      <g>
        <path d='m0 0H512V512H0' fill='#fff' />
        <path d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341' fill='#34a853' />
        <path d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57' fill='#4285f4' />
        <path d='m90 341a208 200 0 010-171l63 49q-12 37 0 73' fill='#fbbc02' />
        <path d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55' fill='#ea4335' />
      </g>
    </svg>
  )
}
