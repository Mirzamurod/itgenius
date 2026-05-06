'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCargoList } from '@/services/cargoService'

type UseCargoListQueryParams = {
  page: number
  limit: number
  status?: string
  sort?: string
}

export function useCargoListQuery({
  page,
  limit,
  status = 'SEARCHING_ALL',
  sort = 'created_at:desc',
}: UseCargoListQueryParams) {
  return useQuery({
    queryKey: ['cargo-list', page, limit, status, sort],
    queryFn: () => getCargoList({ page, limit, status, sort }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}
