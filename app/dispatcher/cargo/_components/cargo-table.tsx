import type { ReactNode } from 'react'
import type { CargoItem, CargoRoutePoint } from '@/types/cargo'

import { useMemo } from 'react'
import { Forward, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type CargoTableProps = {
  rows: CargoItem[]
  footer?: ReactNode
}

export const CargoTable = ({ rows, footer }: CargoTableProps) => {
  const { t, i18n } = useTranslation()
  const currentLang = (i18n.language?.slice(0, 2) ?? 'uz') as 'uz' | 'ru' | 'en'

  const getRoutePoint = (points: CargoRoutePoint[], order: number) =>
    points.find(point => point.point_order === order)

  const getCargoTypeName = (item: CargoItem) => {
    if (!item.cargo_type) return '-'
    if (currentLang === 'ru') return item.cargo_type.name_ru
    if (currentLang === 'en') return item.cargo_type.name_en
    return item.cargo_type.name_uz
  }

  const formatDate = (date: string | undefined) => {
    if (!date) return '-'
    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) return '-'
    return parsed.toLocaleDateString(i18n.language || 'uz', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const tableRows = useMemo(
    () =>
      rows.map(row => {
        const fromPoint = getRoutePoint(row.route_points, 1)
        const toPoint = getRoutePoint(row.route_points, 2)

        return {
          id: row.id,
          status: row.status,
          fromCode: fromPoint?.city_code ?? '-',
          fromDate: formatDate(fromPoint?.date),
          toCode: toPoint?.city_code ?? '-',
          toDate: formatDate(toPoint?.date),
          price: `${row.payment?.total_amount ?? '-'} ${row.payment?.total_currency ?? ''}`.trim(),
          paymentType: row.payment?.prepayment_type ?? '-',
          cargoWeight: `${row.weight ?? '-'} t`,
          cargoTypeName: getCargoTypeName(row),
          customerName: row.contact_name ?? '-',
          customerPhone: row.contact_phone ?? '-',
        }
      }),
    [rows, currentLang, i18n.language],
  )

  return (
    <section className='overflow-hidden rounded-2xl border bg-card shadow-sm'>
      <div className='space-y-3 p-3 md:hidden'>
        {tableRows.length > 0 ? (
          tableRows.map(row => {
            return (
              <article key={row.id} className='rounded-xl border bg-background p-3'>
                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <div>
                    <p className='text-[11px] uppercase text-muted-foreground'>
                      {t('cargo.table.from', 'Qayerdan olish')}
                    </p>
                    <p className='font-semibold'>{row.fromCode}</p>
                    <p className='text-xs text-muted-foreground'>{row.fromDate}</p>
                  </div>
                  <div>
                    <p className='text-[11px] uppercase text-muted-foreground'>
                      {t('cargo.table.to', 'Qayerga')}
                    </p>
                    <p className='font-semibold'>{row.toCode}</p>
                    <p className='text-xs text-muted-foreground'>{row.toDate}</p>
                  </div>
                  <div>
                    <p className='text-[11px] uppercase text-muted-foreground'>
                      {t('cargo.table.price', 'Narx')}
                    </p>
                    <p className='font-semibold'>{row.price}</p>
                    <p className='text-xs text-muted-foreground'>{row.paymentType}</p>
                  </div>
                  <div>
                    <p className='text-[11px] uppercase text-muted-foreground'>
                      {t('cargo.table.cargo', 'Yuk')}
                    </p>
                    <p className='font-semibold'>{row.cargoWeight}</p>
                    <p className='text-xs text-muted-foreground'>{row.cargoTypeName}</p>
                  </div>
                  <div className='col-span-2'>
                    <p className='text-[11px] uppercase text-muted-foreground'>
                      {t('cargo.table.customer', 'Buyurtmachi')}
                    </p>
                    <p className='font-semibold'>{row.customerName}</p>
                    <p className='text-xs text-muted-foreground'>{row.customerPhone}</p>
                  </div>
                </div>
                <div className='mt-3 flex items-center justify-end gap-1 border-t pt-2'>
                  <button
                    type='button'
                    className='rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground'
                    aria-label='Like'
                  >
                    <Heart className='size-4' />
                  </button>
                  <button
                    type='button'
                    className='rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground'
                    aria-label='Share'
                  >
                    <Forward className='size-4' />
                  </button>
                </div>
              </article>
            )
          })
        ) : (
          <div className='rounded-xl border bg-background px-4 py-8 text-center text-sm text-muted-foreground'>
            {t('cargo.emptyTitle', 'Maʼlumot topilmadi')}
          </div>
        )}
      </div>

      <div className='hidden overflow-x-auto md:block'>
        <table className='w-full min-w-[980px] border-collapse'>
          <thead>
            <tr className='bg-muted/40 text-left'>
              <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-5'>
                {t('cargo.table.from', 'Qayerdan olish')}
              </th>
              <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-5'>
                {t('cargo.table.to', 'Qayerga')}
              </th>
              <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-5'>
                {t('cargo.table.price', 'Narx')}
              </th>
              <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-5'>
                {t('cargo.table.cargo', 'Yuk')}
              </th>
              <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-5'>
                {t('cargo.table.customer', 'Buyurtmachi')}
              </th>
              <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:px-5'>
                {t('cargo.table.actions', 'Amallar')}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length > 0 ? (
              tableRows.map(row => {
                return (
                  <tr key={row.id} className='border-t transition-colors hover:bg-muted/30'>
                    <td className='px-4 py-3 text-sm md:px-5'>
                      <p className='font-semibold'>{row.fromCode}</p>
                      <p className='text-xs text-muted-foreground'>{row.fromDate}</p>
                    </td>
                    <td className='px-4 py-3 text-sm md:px-5'>
                      <p className='font-semibold'>{row.toCode}</p>
                      <p className='text-xs text-muted-foreground'>{row.toDate}</p>
                    </td>
                    <td className='px-4 py-3 text-sm md:px-5'>
                      <p className='font-semibold'>{row.price}</p>
                      <p className='text-xs text-muted-foreground'>{row.paymentType}</p>
                    </td>
                    <td className='px-4 py-3 text-sm md:px-5'>
                      <p className='font-semibold'>{row.cargoWeight}</p>
                      <p className='text-xs text-muted-foreground'>{row.cargoTypeName}</p>
                    </td>
                    <td className='px-4 py-3 text-sm md:px-5'>
                      <p className='font-semibold'>{row.customerName}</p>
                      <p className='text-xs text-muted-foreground'>{row.customerPhone}</p>
                    </td>
                    <td className='px-4 py-3 text-sm md:px-5'>
                      <div className='flex items-center gap-1'>
                        <button
                          type='button'
                          className='rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground'
                          aria-label='Like'
                        >
                          <Heart className='size-4' />
                        </button>
                        <button
                          type='button'
                          className='rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground'
                          aria-label='Share'
                        >
                          <Forward className='size-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className='px-4 py-10 text-center text-sm text-muted-foreground md:px-5'
                >
                  {t('cargo.emptyTitle', 'Maʼlumot topilmadi')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {footer ? (
        <div className='flex justify-end border-t bg-muted/20 px-3 py-2 md:px-4'>{footer}</div>
      ) : null}
    </section>
  )
}
