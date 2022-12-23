import { useRecoilValue } from 'recoil'

import { User } from 'interfaces/User'
import { userState } from 'state/userState'

export const useCurrentUser = () => {
  const user = useRecoilValue(userState)
  return user
}

export const useCurrentUserAsserted = () => {
  const user = useRecoilValue(userState) as User
  return user
}
