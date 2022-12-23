import { User, UserRole } from 'interfaces/User'

export const hasExpertRole = (user: User) =>
  user.roles.includes(UserRole.Expert)
