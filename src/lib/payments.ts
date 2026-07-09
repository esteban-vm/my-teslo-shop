import type { PayPalOrderStatusResponse } from '@/types/paypal'

export async function getToken(): Promise<string | null> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
  const secret = process.env.PAYPAL_SECRET!
  const token = Buffer.from(`${clientId}:${secret}`, 'utf-8').toString('base64')

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const options: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    cache: 'no-store',
  }

  const oauthUrl = process.env.PAYPAL_OAUTH_URL!
  const result = await fetch(oauthUrl, options).then((res) => res.json())
  return result.access_token
}

export async function verifyPayment(id: string, token: string): Promise<PayPalOrderStatusResponse | null> {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)

  const options: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    cache: 'no-store',
  }

  const ordersUrl = `${process.env.PAYPAL_ORDERS_URL!}/${id}`
  const result = await fetch(ordersUrl, options).then((res) => res.json())
  return result
}
