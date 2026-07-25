import { z } from 'zod'
import './config'

export const CountryResult = z.object({ id: z.string(), name: z.string() })
export const CountryResults = z.array(CountryResult)

export type CountryResult = z.infer<typeof CountryResult>
export type CountryResults = z.infer<typeof CountryResults>
