import axios, { AxiosHeaders } from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
})

apiClient.interceptors.request.use(config => {
  const nextHeaders = AxiosHeaders.from(config.headers ?? {})
  nextHeaders.set('X-Device-Type', process.env.NEXT_PUBLIC_X_DEVICE_TYPE ?? 'web')
  nextHeaders.set('X-Language', process.env.NEXT_PUBLIC_X_LANGUAGE ?? 'uz')
  nextHeaders.set('X-Client-Token', process.env.NEXT_PUBLIC_X_CLIENT_TOKEN ?? '')
  nextHeaders.set('X-User-Token', process.env.NEXT_PUBLIC_X_USER_TOKEN ?? '')

  config.headers = nextHeaders
  return config
})
