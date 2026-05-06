'use client'

import { Search, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

type CargoFilterPanelProps = {
  status: string
  searchValue: string
  onStatusChange: (status: string) => void
  onSearchChange: (value: string) => void
  onSearch: () => void
  onReset: () => void
}

export const CargoFilterPanel = ({
  status,
  searchValue,
  onStatusChange,
  onSearchChange,
  onSearch,
  onReset,
}: CargoFilterPanelProps) => {
  const { t } = useTranslation()

  return (
    <section className='rounded-2xl border bg-card p-4 shadow-sm md:p-5'>
      <div className='grid gap-3 md:grid-cols-[minmax(210px,240px)_1fr_auto_auto] md:items-end'>
        <label className='space-y-2'>
          <span className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {t('cargo.filterStatus', 'Status')}
          </span>
          <select
            value={status}
            onChange={event => onStatusChange(event.target.value)}
            className='h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
          >
            <option value='SEARCHING_ALL'>SEARCHING_ALL</option>
          </select>
        </label>

        <label className='space-y-2'>
          <span className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {t('cargo.filterSearch', 'Search')}
          </span>
          <div className='relative'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
            <input
              value={searchValue}
              onChange={event => onSearchChange(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') onSearch()
              }}
              placeholder={t('cargo.searchPlaceholder', 'Yuk qidirish...')}
              className='h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20'
            />
          </div>
        </label>

        <Button size='lg' onClick={onSearch} className='w-full md:w-auto'>
          <Search />
          {t('cargo.searchButton', 'Qidirish')}
        </Button>

        <Button size='lg' variant='outline' onClick={onReset} className='w-full md:w-auto'>
          <RotateCcw />
          {t('cargo.resetButton', 'Tozalash')}
        </Button>
      </div>
    </section>
  )
}
