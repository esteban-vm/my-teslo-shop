import z from 'zod'
import { WithID } from './shared'

export const CountryResult = WithID.extend({ name: z.string() })
export const CountryResults = z.array(CountryResult)

export type CountryResult = z.infer<typeof CountryResult>
export type CountryResults = z.infer<typeof CountryResults>
