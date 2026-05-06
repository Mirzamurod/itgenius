/**
 * useIsClient Hook
 *
 * Checks if code is running on the client-side (browser).
 * Useful for SSR/SSG compatibility when accessing browser APIs like
 * window, localStorage, document, etc.
 *
 *
 * @returns `true` if running on client-side, `false` on server-side
 *
 * @example
 * const isClient = useIsClient()
 * if (isClient) {
 *   window.localStorage.setItem('key', 'value')
 *   document.title = 'My Page'
 * }
 */
import { useEffect, useState } from 'react'

export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
