export interface CargoType {
  code: string
  id: string
  name_en: string
  name_ru: string
  name_tr: string
  name_uz: string
  name_zh: string
}

export interface CargoPayment {
  cargo_id: string
  id: string
  is_negotiable: boolean
  payment_note: string | null
  payment_terms_note: string | null
  prepayment_amount: number | null
  prepayment_currency: string | null
  prepayment_type: string | null
  price_request: boolean
  remaining_amount: number | null
  remaining_currency: string | null
  remaining_type: string | null
  total_amount: number | null
  total_currency: string | null
  with_prepayment: boolean
}

export interface CargoRoutePoint {
  address: string
  cargo_id: string
  city_code: string
  city_name: string
  comment: string | null
  country_code: string
  date: string
  delivery_asap: boolean
  id: string
  is_main_load: boolean
  is_main_unload: boolean
  lat: number
  lng: number
  orientir: string
  place_id: string
  point_order: number
  ready_enabled: boolean
  region_code: string
  type: 'LOAD' | 'UNLOAD' | string
}

export interface CargoItem {
  id: string
  name: string | null
  status: string
  created_at: string
  updated_at: string
  comment: string | null
  contact_name: string | null
  contact_phone: string | null
  adr_class: string | null
  adr_enabled: boolean
  belts_count: number | null
  cargo_type: CargoType | null
  company_id: string | null
  created_by_id: string | null
  created_by_type: string | null
  dimensions: string | null
  documents: unknown[] | null
  is_liked: boolean
  is_two_drivers_required: boolean
  loading_types: string[]
  moderation_rejection_reason: string | null
  packaging: string | null
  packaging_amount: number | null
  payment: CargoPayment | null
  photos: string[]
  power_plate_type: string | null
  route_points: CargoRoutePoint[]
  shipment_type: string | null
  temp_max: number | null
  temp_min: number | null
  trailer_plate_type: string | null
  truck_type: string | null
  unloading_types: string[]
  vehicles_amount: number | null
  vehicles_left: number | null
  volume: number | null
  way_points: CargoRoutePoint[]
  weight: number | null
}

export interface CargoListPayload {
  data?: CargoItem[]
  items?: CargoItem[]
  total: number
}

export interface CargoListResponse {
  status: string
  code: number
  description: string
  data: CargoListPayload
}

export interface CargoListParams {
  page?: number
  limit?: number
  sort?: string
  status?: string
}
