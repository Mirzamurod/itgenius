'use client'

import { useCallback, useMemo, useState } from 'react'
import { AlertTriangle, Inbox, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useCargoListQuery } from '@/hooks/useCargoListQuery'
import { CargoFilterPanel } from './_components/cargo-filter-panel'
import { CargoPagination } from './_components/cargo-pagination'
import { CargoPageHeader } from './_components/cargo-page-header'
import { CargoTable } from './_components/cargo-table'

export default function DispatcherCargoPage() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('SEARCHING_ALL')
  const [searchInput, setSearchInput] = useState('')
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const { data, isPending, isError, error, refetch } = useCargoListQuery({
    page: currentPage + 1,
    limit,
    status,
  })

  const handleSearch = useCallback(() => {
    setCurrentPage(0)
  }, [])

  const handleReset = useCallback(() => {
    setStatus('SEARCHING_ALL')
    setSearchInput('')
    setLimit(10)
    setCurrentPage(0)
  }, [])

  const tableRows = useMemo(() => data?.data?.items ?? data?.data?.data ?? [], [data])
  const totalRows = useMemo(() => data?.data?.total ?? 0, [data])
  const pageCount = useMemo(() => Math.ceil(totalRows / limit), [totalRows, limit])
  const errorMessage = useMemo(
    () =>
      (error as Error)?.message ??
      t('cargo.errorMessage', 'Maʼlumotlarni yuklashda xatolik yuz berdi. Qayta urinib ko‘ring.'),
    [error, t],
  )

  const handleRetry = useCallback(() => {
    void refetch()
  }, [refetch])

  const handleLimitChange = useCallback((nextLimit: number) => {
    setLimit(nextLimit)
    setCurrentPage(0)
  }, [])

  return (
    <main className='min-h-screen bg-muted/20 p-4 md:p-6'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-4 md:gap-5'>
        <CargoPageHeader />
        <CargoFilterPanel
          status={status}
          searchValue={searchInput}
          onStatusChange={setStatus}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {isPending ? (
          <section className='space-y-3 rounded-2xl border bg-card p-5 shadow-sm'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Loader2 className='size-4 animate-spin' />
              {t('cargo.loading', 'Yuklanmoqda...')}
            </div>
            <div className='space-y-2'>
              <div className='h-10 animate-pulse rounded-md bg-muted/60' />
              <div className='h-10 animate-pulse rounded-md bg-muted/60' />
              <div className='h-10 animate-pulse rounded-md bg-muted/60' />
            </div>
          </section>
        ) : isError ? (
          <section className='rounded-2xl border border-red-200 bg-red-50/70 p-5 shadow-sm'>
            <div className='flex items-start gap-3'>
              <AlertTriangle className='mt-0.5 size-5 text-red-600' />
              <div className='space-y-3'>
                <p className='text-sm font-medium text-red-700'>{errorMessage}</p>
                <Button size='sm' variant='outline' onClick={handleRetry}>
                  {t('cargo.retryButton', 'Qayta urinish')}
                </Button>
              </div>
            </div>
          </section>
        ) : tableRows.length === 0 ? (
          <section className='rounded-2xl border bg-card p-8 text-center shadow-sm'>
            <Inbox className='mx-auto size-10 text-muted-foreground' />
            <h3 className='mt-3 text-base font-semibold'>
              {t('cargo.emptyTitle', 'Maʼlumot topilmadi')}
            </h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              {t(
                'cargo.emptyDescription',
                'Qidiruv so‘rovini o‘zgartirib ko‘ring yoki filterni tozalang.',
              )}
            </p>
          </section>
        ) : (
          <CargoTable
            rows={tableRows}
            footer={
              <CargoPagination
                pageCount={pageCount}
                currentPage={currentPage}
                limit={limit}
                onPageChange={setCurrentPage}
                onLimitChange={handleLimitChange}
              />
            }
          />
        )}
      </div>
    </main>
  )
}
