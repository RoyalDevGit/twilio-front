import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@emotion/react'
import useMediaQuery from '@mui/material/useMediaQuery'

import { UserRole } from 'interfaces/User'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ExpertCardBottom,
  ExpertCardText,
  ExpertCardTop,
  StyledExpertCard,
  SignupAsContainer,
  CardButton,
  LogoContainer,
  SignupAsLogo,
  LogoSubheader,
  StyledVideo,
  MobileCardImage,
} from 'components/SignupAs/styles'
import { Link } from 'components/Link'

interface SignupAsProps {
  onSelection: (userRoleSelected: UserRole) => unknown
}

export const SignupAs: FC<React.PropsWithChildren<SignupAsProps>> = ({
  onSelection,
}) => {
  const { t } = useTranslation(LocaleNamespace.SignupAs)

  const onMouseEnterVideo = (event: React.MouseEvent<HTMLVideoElement>) => {
    const target = event.target as HTMLVideoElement
    return target.play()
  }

  const onMouseLeaveVideo = (event: React.MouseEvent<HTMLVideoElement>) => {
    const target = event.target as HTMLVideoElement
    return target.pause()
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('laptop'))

  return (
    <>
      <LogoContainer>
        <Link href="/">
          <SignupAsLogo />
        </Link>

        <LogoSubheader>{t('subHeader')}</LogoSubheader>
      </LogoContainer>
      <SignupAsContainer>
        <CardButton
          id="signup-expert-button"
          onClick={() => onSelection(UserRole.Expert)}
        >
          <StyledExpertCard>
            <ExpertCardTop>
              {isMobile && (
                <MobileCardImage
                  src="/static/img/mobile-signup/experts-image.png"
                  width={500}
                  height={300}
                  alt=""
                  unoptimized={false}
                />
              )}
              {!isMobile && (
                <StyledVideo
                  onMouseEnter={(e) => onMouseEnterVideo(e)}
                  onMouseLeave={(e) => onMouseLeaveVideo(e)}
                  src="/static/img/desktop-signup/experts-animation.mp4"
                />
              )}
            </ExpertCardTop>
            <ExpertCardBottom>
              <ExpertCardText>{t('alreadyExpert')}</ExpertCardText>
            </ExpertCardBottom>
          </StyledExpertCard>
        </CardButton>
        <CardButton
          id="signup-consumer-button"
          onClick={() => onSelection(UserRole.Consumer)}
        >
          <StyledExpertCard>
            <ExpertCardTop>
              {isMobile && (
                <MobileCardImage
                  src="/static/img/mobile-signup/consumers-image.png"
                  width={500}
                  height={300}
                  alt=""
                  unoptimized={false}
                />
              )}
              {!isMobile && (
                <StyledVideo
                  onMouseEnter={(e) => onMouseEnterVideo(e)}
                  onMouseLeave={(e) => onMouseLeaveVideo(e)}
                  src="/static/img/desktop-signup/consumers-animation.mp4"
                />
              )}
            </ExpertCardTop>
            <ExpertCardBottom>
              <ExpertCardText>{t('needExpert')}</ExpertCardText>
            </ExpertCardBottom>
          </StyledExpertCard>
        </CardButton>
      </SignupAsContainer>
    </>
  )
}
