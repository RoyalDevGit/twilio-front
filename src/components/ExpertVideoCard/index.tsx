import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  VideoCardTimeChip,
  VideoCardAvatar,
  VideoCardExpertContent,
  FavoriteCardIcon,
  VideoContentBox,
  VideoCard,
  VideoActionAreaBox,
  VideoCardMedia,
  VideoCardLink,
  VideoMediaBox,
  VideoAvatarBox,
} from 'components/ExpertVideoCard/styles'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { getUserFullName } from 'utils/user/getUserFullName'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { HeartIconFilled } from 'icons/Heart/Filled'
import { HeartIconEmpty } from 'icons/Heart/Empty'

export const ExpertVideoCard: FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(LocaleNamespace.ExpertVideoCard)
  const user = useCurrentUserAsserted()
  const userFullName = getUserFullName(user)
  const userPictureUrl = getUserPictureUrl(user)
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <VideoCard>
      <VideoActionAreaBox>
        <VideoMediaBox>
          <VideoCardMedia
            component="img"
            src="https://www.jacksonsart.com/blog/wp-content/uploads/2020/06/Watermixable_Oil_Mediums_Blog_Images_2.jpg"
          />
        </VideoMediaBox>

        <VideoCardTimeChip label={`10 ${t('expertVideoMinutes')}`} />
        <FavoriteCardIcon onClick={() => setIsFavorited(!isFavorited)}>
          {isFavorited && <HeartIconFilled />}
          {!isFavorited && <HeartIconEmpty />}
        </FavoriteCardIcon>
        <VideoAvatarBox>
          <VideoCardAvatar
            alt={userFullName}
            src={userPictureUrl}
            firstName={user.firstName}
            lastName={user.lastName}
            width={41}
            height={41}
          />
        </VideoAvatarBox>
      </VideoActionAreaBox>

      <VideoCardExpertContent>
        <Typography variant="body2" color="text.secondary">
          Oliver Lewis
        </Typography>
        <VideoCardLink href="">Top 10 tips on oil paint</VideoCardLink>
        <VideoContentBox>
          <Typography variant="body2" color="text.secondary">
            125 {t('expertViews')}
          </Typography>
        </VideoContentBox>
      </VideoCardExpertContent>
    </VideoCard>
  )
}
