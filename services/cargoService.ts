import type { CargoListParams, CargoListResponse } from '@/types/cargo'

import { apiClient } from '@/services/apiClient'

const DEFAULT_CARGO_PARAMS: Required<CargoListParams> = {
  page: 1,
  limit: 20,
  sort: 'created_at:desc',
  status: 'SEARCHING_ALL',
}

export async function getCargoList(params: CargoListParams = {}): Promise<CargoListResponse> {
  const { data } = await apiClient.get<CargoListResponse>('/dispatchers/cargo/all', {
    params: {
      ...DEFAULT_CARGO_PARAMS,
      ...params,
    },
  })

  return data
}
