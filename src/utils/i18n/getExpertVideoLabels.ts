import { TFunction } from 'next-i18next'

import {
  Video,
  VideoAudience,
  VideoStatus,
  VideoVisibility,
} from 'interfaces/Video'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export const getVideoStatusLabel = (t: TFunction, status: VideoStatus) => {
  switch (status) {
    case VideoStatus.Draft:
      return t(`${LocaleNamespace.ExpertVideos}:draftStatusLabel`)
    case VideoStatus.Published:
      return t(`${LocaleNamespace.ExpertVideos}:publishedStatusLabel`)
    case VideoStatus.Uploaded:
      return t(`${LocaleNamespace.ExpertVideos}:uploadedStatusLabel`)
  }
}

export const getVideoRestrictionsLabel = (t: TFunction, video: Video) => {
  if (video.madeForKids) {
    return t(`${LocaleNamespace.ExpertVideos}:restrictionsKids`)
  }

  if (video.audience === VideoAudience.Adults) {
    return t(`${LocaleNamespace.ExpertVideos}:ageRestrictions`)
  }

  return t(`${LocaleNamespace.ExpertVideos}:noRestrictions`)
}

export const getVideoVisibilityLabel = (
  t: TFunction,
  visibility: VideoVisibility
) => {
  switch (visibility) {
    case VideoVisibility.Private:
      return t(`${LocaleNamespace.ExpertVideos}:visibilityPrivate`)
    case VideoVisibility.Unlisted:
      return t(`${LocaleNamespace.ExpertVideos}:visibilityUnlisted`)
    case VideoVisibility.Public:
      return t(`${LocaleNamespace.ExpertVideos}:visibilityPublic`)
  }
}
