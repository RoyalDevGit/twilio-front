import { User } from 'interfaces/User'

export const getUserFullName = (user?: User) =>
  `${user?.firstName} ${user?.lastName}`
