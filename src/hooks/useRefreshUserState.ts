import { useSetRecoilState } from 'recoil'

import { UserApi } from 'apis/UserApi'
import { userState } from 'state/userState'

export const useRefreshUserState = () => {
  const setUser = useSetRecoilState(userState)
  return async () => {
    const userResult = await UserApi.getCurrent()
    const user = await userResult.getData()
    setUser(user)
  }
}
