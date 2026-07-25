import { z } from 'zod'

z.config({
  ...z.locales.es(),

  customError(iss) {
    const { code, maximum, minimum } = iss

    if (code === 'too_small') {
      if (minimum > 1) {
        return `Ingresa por lo menos ${minimum} caracteres`
      }

      return 'Este campo no puede quedar vacío'
    }

    if (code === 'too_big') {
      return `Ingresa como máximo ${maximum} caracteres`
    }
  },
})
