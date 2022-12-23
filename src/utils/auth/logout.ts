import { AuthApi } from 'apis/AuthApi'

const pathsToIgnore = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
]

export const logout = async (): Promise<void> => {
  if (pathsToIgnore.includes(window.location.pathname.toLowerCase())) {
    return
  }
  await AuthApi.logout()

  window.location.href = '/login'
}
