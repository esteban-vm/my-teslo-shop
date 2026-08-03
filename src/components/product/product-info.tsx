'use client'

import { GlobeIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'rsc-daisyui'

export function ProductInfo({ info }: { info: string }) {
  const translator = useRef<Translator>(null)
  const detector = useRef<LanguageDetector>(null)
  const [productInfo, setProductInfo] = useState(info)
  const [canTranslate, setCanTranslate] = useState(false)

  useEffect(() => {
    const initTranslator = async () => {
      if (!('Translator' in self) || !('LanguageDetector' in self)) return

      try {
        const detectorOptions: LanguageDetectorCreateCoreOptions = { expectedInputLanguages: ['en'] }
        const detectorAvailability = await LanguageDetector.availability(detectorOptions)

        if (detectorAvailability === 'available') {
          detector.current = await LanguageDetector.create(detectorOptions)

          const results = await detector.current.detect(info)
          const language = results[0].detectedLanguage ?? 'en'

          if (language.startsWith('es')) return

          const translatorOptions: TranslatorCreateCoreOptions = { sourceLanguage: language, targetLanguage: 'es' }
          const translatorAvailability = await Translator.availability(translatorOptions)

          if (translatorAvailability === 'available') {
            translator.current = await Translator.create(translatorOptions)
            setCanTranslate(true)
          }
        }
      } catch {
        setCanTranslate(false)
      }
    }

    initTranslator()

    return () => {
      translator.current?.destroy()
      detector.current?.destroy()
    }
  }, [info])

  const onTranslate = async () => {
    if (!translator.current) return
    setCanTranslate(false)
    const translation = await translator.current.translate(productInfo)
    setProductInfo(translation)
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
