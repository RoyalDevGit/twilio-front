import { FC, useState, MouseEvent } from 'react'
import { useTranslation } from 'next-i18next'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FlagOutlined from '@mui/icons-material/FlagOutlined'

import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { getUserFullName } from 'utils/user/getUserFullName'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  CommentActions,
  CommentActionsBox,
  CommentAvatarSection,
  CommentAvatarSectionBox,
  CommentAvatarUserNameBox,
  CommentCardAvatar,
  CommentDescription,
  CommentInfoSection,
  CommentInteractionActions,
  CommentKebobMenu,
  Comments,
  CommentShowMoreButton,
  CommentText,
  CommentBox,
  CommentUserName,
  ExpertOptionsIcon,
  GrayText,
  ReviewTitle,
  CommentImgBox,
  HelpfulReviewsLabel,
  CommentOptionsMenu,
  CommentReviewCard,
  HelpfulCommentButton,
  ReportCommentButton,
} from 'components/CommentCard/styles'
import { StarRating } from 'components/StarRating'
import { Image } from 'components/Image'

const previewLength = 300

export const CommentCard: FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(LocaleNamespace.Comments)
  const user = useCurrentUserAsserted()
  const userFullName = getUserFullName(user)
  const userPictureUrl = getUserPictureUrl(user)
  const [showingMoreText, setShowingMoreText] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null
  )

  function handleOpenMenu(event: MouseEvent<HTMLButtonElement>) {
    setMenuAnchorEl(event.currentTarget)
  }

  function handleCloseMenu() {
    setMenuAnchorEl(null)
  }

  function handleClickShowMore() {
    return setShowingMoreText((prev) => !prev)
  }

  const content =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci exercitationem ipsa nulla fugit sunt quasi nostrum atque nesciunt asperiores libero. Quasi corporis, exercitationem at neque, adipisci impedit vel doloribus veritatis quod eaque, voluptate similique culpa natus alias eligendi sapiente? Explicabo quibusdam itaque quas ad accusamus ratione sed repudiandae repellendus ducimus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci exercitationem ipsa nulla fugit sunt quasi nostrum atque nesciunt asperiores libero. Quasi corporis, exercitationem at neque, adipisci impedit vel doloribus veritatis quod eaque, voluptate similique culpa natus alias eligendi sapiente? Explicabo quibusdam itaque quas ad accusamus ratione sed repudiandae repellendus ducimus.'
  const previewText = content.slice(0, previewLength)
  const showReadMoreButton = content.length > previewLength
  return (
    <CommentReviewCard>
      <Comments>
        <CommentAvatarSection>
          <CommentAvatarSectionBox>
            <CommentCardAvatar
              alt={userFullName}
              src={userPictureUrl}
              firstName={user.firstName}
              lastName={user.lastName}
              width={56}
              height={56}
            />
            <CommentAvatarUserNameBox>
              <CommentUserName variant="h6">{userFullName}</CommentUserName>
              <CommentBox>
                <StarRating name="read-only" size="small" value={4} readOnly />
              </CommentBox>
            </CommentAvatarUserNameBox>
          </CommentAvatarSectionBox>
          <CommentInteractionActions>
            <CommentKebobMenu onClick={handleOpenMenu}>
              <ExpertOptionsIcon />
            </CommentKebobMenu>
          </CommentInteractionActions>
        </CommentAvatarSection>

        <CommentInfoSection>
          <ReviewTitle>
            It’s clear that Oliver cares about his craft!
          </ReviewTitle>

          <CommentDescription>
            {showingMoreText ? content : previewText}
            {showReadMoreButton && !showingMoreText && (
              <CommentText variant="body1">...</CommentText>
            )}
          </CommentDescription>
          {showReadMoreButton && (
            <CommentShowMoreButton
              onClick={handleClickShowMore}
              variant="text"
              size="small"
            >
              <GrayText>
                {showingMoreText ? t('readLess') : t('readMore')}
              </GrayText>
            </CommentShowMoreButton>
          )}
          <CommentImgBox>
            <Image
              src="https://th-thumbnailer.cdn-si-edu.com/9_nF8K71A4lj1lilCqZEd4YrwXA=/1000x750/filters:no_upscale():focal(761x548:762x549)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b6/e5/b6e53329-b6df-4539-8279-46451cf4dba0/picasso.png"
              alt="painting"
              width={120}
              height={80}
            />
          </CommentImgBox>
        </CommentInfoSection>
        <CommentActions>
          <HelpfulReviewsLabel>10 {t('reviewsHelpful')}</HelpfulReviewsLabel>
          <CommentActionsBox>
            <HelpfulCommentButton variant="outlined">
              {t('reviewsHelpfulButton')}
            </HelpfulCommentButton>
            <ReportCommentButton>
              {t('reviewsReportAbuseButton')}
            </ReportCommentButton>
          </CommentActionsBox>
        </CommentActions>
      </Comments>
      <Popover
        id={menuAnchorEl ? 'comment-menu' : undefined}
        open={!!menuAnchorEl}
        anchorEl={menuAnchorEl}
        onClose={handleCloseMenu}
      >
        <CommentOptionsMenu>
          <MenuItem>
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText>{t('deleteActionLabel')}</ListItemText>
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <FlagOutlined />
            </ListItemIcon>
            <ListItemText>{t('reportActionLabel')}</ListItemText>
          </MenuItem>
        </CommentOptionsMenu>
      </Popover>
    </CommentReviewCard>
  )
}
