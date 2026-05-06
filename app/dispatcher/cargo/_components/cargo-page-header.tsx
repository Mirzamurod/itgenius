'use client'

import { useTranslation } from 'react-i18next'
import { ModeToggle } from '@/components/shared/mode-toggle'

const LANGUAGE_OPTIONS = ['uz', 'ru', 'en'] as const

export const CargoPageHeader = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.language?.slice(0, 2) ?? 'uz') as (typeof LANGUAGE_OPTIONS)[number]

  return (
    <header className='rounded-2xl border bg-card p-5 shadow-sm md:p-6'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div>
          <p className='text-xs text-muted-foreground md:text-sm'>
            {t('cargo.breadcrumb', 'Bosh sahifa / Barcha yuklar')}
          </p>
          <h1 className='mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
            {t('cargo.title', 'Barcha yuklar')}
          </h1>
        </div>
        <div className='flex items-center gap-2'>
          <select
            value={currentLanguage}
            onChange={event => void i18n.changeLanguage(event.target.value)}
            className='h-8 rounded-md border bg-background px-2 text-xs font-medium uppercase text-muted-foreground outline-none'
            aria-label='Language'
          >
            {LANGUAGE_OPTIONS.map(lang => (
              <option key={lang} value={lang}>
                {t(`language.${lang}`, lang)}
              </option>
            ))}
          </select>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
