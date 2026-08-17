'use server'

import { safeAdminClient } from '@/lib/safe-action'
import { ProductImage } from '@/schemas/product'

export const deleteProductImage = safeAdminClient.inputSchema(ProductImage).action(async ({ parsedInput }) => {
  const { id, url } = parsedInput
  console.log({ id, url })
})
