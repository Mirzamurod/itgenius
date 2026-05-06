'use client'

import ReactPaginate from 'react-paginate'
import { useTranslation } from 'react-i18next'

const LIMIT_OPTIONS = [10, 20, 50] as const

type CargoPaginationProps = {
  pageCount: number
  currentPage: number
  limit: number
  onPageChange: (selectedPage: number) => void
  onLimitChange: (limit: number) => void
}

export const CargoPagination = ({
  pageCount,
  currentPage,
  limit,
  onPageChange,
  onLimitChange,
}: CargoPaginationProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-wrap items-center justify-end gap-2'>
      <div className='flex items-center gap-2'>
        <span className='text-xs text-muted-foreground'>{t('cargo.paginationLimit', 'Limit')}</span>
        <select
          value={limit}
          onChange={event => onLimitChange(Number(event.target.value))}
          className='h-8 rounded-md border bg-background px-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
        >
          {LIMIT_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <ReactPaginate
        breakLabel='...'
        nextLabel={t('cargo.paginationNext', 'Next')}
        previousLabel={t('cargo.paginationPrev', 'Prev')}
        forcePage={currentPage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={Math.max(pageCount, 1)}
        onPageChange={item => onPageChange(item.selected)}
        containerClassName='flex flex-wrap items-center gap-1'
        pageClassName='h-8 min-w-8'
        pageLinkClassName='inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs transition hover:bg-muted'
        previousClassName='h-8'
        previousLinkClassName='inline-flex h-8 items-center justify-center rounded-md border px-2 text-xs transition hover:bg-muted'
        nextClassName='h-8'
        nextLinkClassName='inline-flex h-8 items-center justify-center rounded-md border px-2 text-xs transition hover:bg-muted'
        breakClassName='h-8 min-w-8'
        breakLinkClassName='inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs text-muted-foreground'
        activeLinkClassName='!border-primary !bg-primary !text-primary-foreground hover:!bg-primary'
        disabledLinkClassName='pointer-events-none opacity-50'
      />
    </div>
  )
}
