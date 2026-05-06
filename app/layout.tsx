import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme.provider'

import './globals.css'

const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Sarbon Dispatcher Cargo',
  description: 'Dispatcher cargo list and management page',
  icons: {
    icon: '/images/srb.png',
    shortcut: '/images/srb.png',
    apple: '/images/srb.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${nunito.className} ${nunito.variable} antialiased`}>
        <ThemeProvider
          enableSystem={false}
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
