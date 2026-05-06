'use client'

import type { FC, ReactNode } from 'react'

// React Imports
import { Fragment } from 'react'

// Next Import
import { ToastContainer } from 'react-toastify'
import { useTheme } from 'next-themes'
import { useIsClient } from '@/hooks/useIsClient'

interface Props {
  children: ReactNode
}

const WindowWrapper: FC<Props> = ({ children }) => {
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient()

  if (isClient)
    return (
      <Fragment>
        {children}
        <ToastContainer stacked theme={resolvedTheme} position='bottom-right' />
      </Fragment>
    )

  return null
}

export default WindowWrapper
