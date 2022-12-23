import { useRecoilValue } from 'recoil'

import { Expert } from 'interfaces/Expert'
import { expertState } from 'state/expertState'

export const useExpert = () => {
  const expert = useRecoilValue(expertState)
  return expert
}

export const useExpertAsserted = () => {
  const expert = useRecoilValue(expertState) as Expert
  return expert
}
