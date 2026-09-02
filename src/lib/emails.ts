import type { SendMailOptions } from 'nodemailer'
import { createTransport } from 'nodemailer'

export type SendEmailArgs = Omit<SendMailOptions, 'from' | 'priority'>

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
})

export async function sendEmail(args: SendEmailArgs) {
  try {
    const info = await transporter.sendMail({
      ...args,
      priority: 'high',
      from: {
        name: 'Teslo Shop',
        address: process.env.NODEMAILER_USER!,
      },
    })

    console.log(info)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
