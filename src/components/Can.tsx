import { useCan } from '@/hooks/useCan'
import React from 'react'

interface CanProps {
  permissions?: string[]
  roles?: string[]
  children: React.ReactNode
}

export function Can({ children, permissions, roles }: CanProps) {
  const canUserSeeComponent = useCan({
    permissions,
    roles,
  })

  if (!canUserSeeComponent) {
    return null
  }

  return <>{children}</>
}
