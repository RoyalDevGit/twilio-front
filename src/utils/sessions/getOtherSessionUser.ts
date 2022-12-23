import { Expert } from 'interfaces/Expert'
import { Session } from 'interfaces/Session'
import { User } from 'interfaces/User'

export const getOtherSessionUser = (currentUser: User, session: Session) => {
  const expert = session.expert as Expert
  const consumer = session.consumer as User
  return currentUser.id === consumer.id ? expert.user : consumer
}
