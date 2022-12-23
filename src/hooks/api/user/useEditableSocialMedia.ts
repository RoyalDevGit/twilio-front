import isURL from 'validator/lib/isURL'

import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'

export type SocialMediaLinkProvider =
  | 'twitter'
  | 'facebook'
  | 'linkedIn'
  | 'youTube'
  | 'instagram'

export const useEditableSocialMedia = (
  expert: Expert | undefined,
  provider: SocialMediaLinkProvider
) => {
  const refreshExpertState = useRefreshExpertState()
  const onSave = async (link: string) => {
    if (!expert) {
      return
    }
    if (!isURL(link)) {
      throw new Error('Invalid social media URL')
    }
    const url = new URL(link)
    const hostname = url.hostname.toLowerCase()
    switch (provider) {
      case 'facebook':
        if (hostname !== 'www.facebook.com') {
          throw new Error('Social media link does not match the provider')
        }
        break
      case 'linkedIn':
        if (hostname !== 'www.linkedin.com') {
          throw new Error('Social media link does not match the provider')
        }
        break
      case 'twitter':
        if (hostname !== 'www.twitter.com') {
          throw new Error('Social media link does not match the provider')
        }
        break
      case 'youTube':
        if (hostname !== 'www.youtube.com') {
          throw new Error('Social media link does not match the provider')
        }
        break
      case 'instagram':
        if (hostname !== 'www.instagram.com') {
          throw new Error('Social media link does not match the provider')
        }
        break
    }
    const result = await ExpertApi.update(expert.id, {
      expertData: {
        socialMediaLinks: {
          [provider]: link,
        },
      },
    })

    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableTextInput = useEditableTextInput({
    initialValue: expert?.socialMediaLinks
      ? expert.socialMediaLinks[provider] || ''
      : '',
    onSave,
  })

  return editableTextInput
}
