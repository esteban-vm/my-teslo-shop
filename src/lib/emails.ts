import type { SendMailOptions } from 'nodemailer'
import { createTransport } from 'nodemailer'

export type SendEmailArgs = Omit<SendMailOptions, 'from'>

export async function sendEmail(args: SendEmailArgs) {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  })

  const info = await transporter.sendMail({
    ...args,
    from: {
      name: 'Teslo Shop',
      address: process.env.NODEMAILER_USER!,
    },
  })

  console.table(info)
  transporter.close()
}
