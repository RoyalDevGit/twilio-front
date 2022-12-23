import { User } from 'interfaces/User'

export const isGuestUser = (user: User | undefined | null) =>
  !user || user.isGuest
