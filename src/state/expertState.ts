import { atom } from 'recoil'

import { Expert } from 'interfaces/Expert'
import { setExpertCookie } from 'utils/cookies/cookieUtils'

export const expertState = atom<Expert | undefined>({
  key: 'expert',
  default: undefined,
  effects: [
    ({ onSet }) => {
      onSet((newState) => {
        setExpertCookie(newState as Expert, {})
      })
    },
  ],
})
