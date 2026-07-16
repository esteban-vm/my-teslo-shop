import z from 'zod'
import { WithID } from './shared'

export const CountryDAO = WithID.extend({ name: z.string() })
export const CountryResults = z.array(CountryDAO)

export type CountryDAO = z.infer<typeof CountryDAO>
export type CountryResults = z.infer<typeof CountryResults>
