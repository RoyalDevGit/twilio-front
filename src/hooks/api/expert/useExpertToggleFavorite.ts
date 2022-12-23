import { useCallback, useState } from 'react'

import { useRouter } from 'hooks/useRouter'
import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { AuthReason } from 'interfaces/AuthReason'

interface UseExpertToggleFavorite {
  guestUserRedirectTo?: string
}

export const useExpertToggleFavorite = (
  expert: Expert,
  options?: UseExpertToggleFavorite
) => {
  const [isReachingApi, setIsReachingApi] = useState(false)
  const user = useCurrentUser()
  const isGuest = isGuestUser(user)
  const router = useRouter()

  const toggleFavorite = useCallback(async () => {
    const redirectToSignup = () => {
      router.push(
        urlJoinWithQuery('/signup', {
          as: 'consumer',
          authReason: AuthReason.ExpertFavorite,
          redirectTo: options?.guestUserRedirectTo || router.asPath,
        })
      )
    }

    if (isGuest) {
      redirectToSignup()
      return
    }

    if (isReachingApi) {
      return
    }
    setIsReachingApi(true)
    const updatedExpertResult = expert.isFavorite
      ? await ExpertApi.unfavoriteExpert(expert.id)
      : await ExpertApi.favoriteExpert(expert.id)
    const updatedExpert = await updatedExpertResult.getData()
    setIsReachingApi(false)

    return updatedExpert
  }, [expert])

  return toggleFavorite
}
