import { atom } from 'recoil'

import { User } from 'interfaces/User'
import { setUserCookie } from 'utils/cookies/cookieUtils'

export const userState = atom<User | undefined>({
  key: 'user',
  default: undefined,
  effects: [
    ({ onSet }) => {
      onSet((newState) => {
        setUserCookie(newState as User, {})
      })
    },
  ],
})
