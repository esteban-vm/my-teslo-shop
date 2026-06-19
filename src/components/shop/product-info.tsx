'use client'

import { GlobeIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'rsc-daisyui'

export function ProductInfo({ info }: { info: string }) {
  const translator = useRef<Translator>(null)
  const [productInfo, setProductInfo] = useState(info)
  const [canTranslate, setCanTranslate] = useState(false)

  useEffect(() => {
    const initTranslator = async () => {
      if (!('Translator' in self)) return

      const options: TranslatorCreateCoreOptions = {
        sourceLanguage: 'en',
        targetLanguage: 'es',
      }

      const translatorCapabilities = await Translator.availability(options)

      if (translatorCapabilities === 'available') {
        translator.current = await Translator.create(options)
        setCanTranslate(true)
      }
    }

    initTranslator()

    return () => {
      translator.current?.destroy()
    }
  }, [])

  const onTranslate = async () => {
    if (translator.current) {
      setCanTranslate(false)
      const translation = await translator.current.translate(productInfo)
      setProductInfo(translation)
    }
  }

  return (
    <p className='text-justify indent-8 text-sm'>
      {productInfo}&nbsp;
      {canTranslate && (
        <Button onClick={onTranslate} shape='square' size='xs' soft title='Traducir'>
          <GlobeIcon className='size-[75%]' />
        </Button>
      )}
    </p>
  )
}
