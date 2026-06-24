import z from 'zod'
import { ErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'

export const notEmpty = z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty)
