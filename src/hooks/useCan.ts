import { useAuth } from '@/contexts/hooks'

interface UseCanParams {
  permissions?: string[]
  roles?: string[]
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { isAuthenticated } = useAuth()

  // TODO: change for real permissions and roles
  const userPermissions: string[] = []
  const userRoles: string[] = []

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    userPermissions,
    userRoles,
    permissions,
    roles,
  })

  return userHasValidPermissions
}

type validateUserPermissionsParams = {
  userPermissions: string[]
  userRoles: string[]
  permissions?: string[]
  roles?: string[]
}

export const validateUserPermissions = ({
  userPermissions,
  userRoles,
  permissions,
  roles,
}: validateUserPermissionsParams) => {
  if (permissions?.length) {
    const hasAllPermissions = permissions.every((permission) => {
      return userPermissions.includes(permission)
    })

    if (!hasAllPermissions) {
      return false
    }
  }

  if (roles?.length) {
    const hasAllRoles = roles.some((role) => {
      return userRoles.includes(role)
    })

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}
