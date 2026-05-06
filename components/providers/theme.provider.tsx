'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nProvider } from '@/app/i18n'
import WindowWrapper from '../window-wrapper'

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <NextThemesProvider {...props}>
          <WindowWrapper>{children}</WindowWrapper>
        </NextThemesProvider>
      </I18nProvider>
    </QueryClientProvider>
  )
}
