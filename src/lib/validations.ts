import validator from 'validator'

export function Validations() {}

Validations.notEmpty = notEmpty
Validations.notEmail = notEmail
Validations.notPassword = notPassword

function notEmpty(value: string) {
  return !validator.isEmpty(value)
}

function notEmail(value: string) {
  return !validator.isEmail(value)
}

function notPassword(value: string) {
  return !validator.isStrongPassword(value)
}
