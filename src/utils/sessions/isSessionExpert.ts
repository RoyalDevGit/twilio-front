import { Expert } from 'interfaces/Expert'
import { Session } from 'interfaces/Session'
import { User } from 'interfaces/User'

export const isSessionExpert = (session: Session, user: User) => {
  const sessionExpert = session.expert as Expert
  return sessionExpert.user.id === user.id
}
