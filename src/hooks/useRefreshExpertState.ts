import { useSetRecoilState } from 'recoil'

import { ExpertApi } from 'apis/ExpertApi'
import { expertState } from 'state/expertState'
import { useRefreshUserState } from 'hooks/useRefreshUserState'

export const useRefreshExpertState = () => {
  const refreshUserState = useRefreshUserState()
  const setExpert = useSetRecoilState(expertState)
  return async () => {
    refreshUserState()
    const expertResult = await ExpertApi.getCurrent()
    const expert = await expertResult.getData()
    setExpert(expert)
  }
}
