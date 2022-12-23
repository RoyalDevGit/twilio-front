import { FC, Fragment } from 'react'
import { UserRole } from 'aws-sdk/clients/workmail'
import { useTranslation } from 'next-i18next'

import { OAuthDevice, OAuthProvider, OAuthType } from 'interfaces/OAuth'
import { Config } from 'utils/config'
import {
  StyledText,
  StyledLink,
  InnerWrapper,
  OuterWrapper,
} from 'components/SocialMediaButtons/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { FacebookIcon } from 'icons/OAuth/Facebook'
import { GoogleIcon } from 'icons/OAuth/Google'
import { AppleIcon } from 'icons/OAuth/Apple'
import { MicrosoftIcon } from 'icons/OAuth/Microsoft'

interface SocialMediaButtonContainerProps {
  path: OAuthType
  role: UserRole
}

const API_URL = Config.getString('API_URL')

interface OAuthButtonProps {
  provider: OAuthProvider
  path: OAuthType
  role: UserRole
  Icon: JSX.Element
}

function SocialMediaButton({ provider, path, role, Icon }: OAuthButtonProps) {
  const { t } = useTranslation([LocaleNamespace.Common])
  const href = `${API_URL}/oauth/${provider}/${path}/${role}/${OAuthDevice.Desktop}`
  return (
    <OuterWrapper>
      <StyledLink href={href} id={`${path}-${provider}-button`}>
        <InnerWrapper>
          <div>{Icon}</div>
          <StyledText>{t(`${provider}${path}Button`)}</StyledText>
        </InnerWrapper>
      </StyledLink>
    </OuterWrapper>
  )
}

export const OAuthButtonContainer: FC<
  React.PropsWithChildren<SocialMediaButtonContainerProps>
> = ({ path, role }: SocialMediaButtonContainerProps) => (
  <Fragment>
    <SocialMediaButton
      provider={OAuthProvider.Google}
      path={path}
      role={role}
      Icon={<GoogleIcon />}
    />
    <SocialMediaButton
      provider={OAuthProvider.Facebook}
      path={path}
      role={role}
      Icon={<FacebookIcon />}
    />
    <SocialMediaButton
      provider={OAuthProvider.Apple}
      path={path}
      role={role}
      Icon={<AppleIcon />}
    />
    <SocialMediaButton
      provider={OAuthProvider.Microsoft}
      path={path}
      role={role}
      Icon={<MicrosoftIcon />}
    />
  </Fragment>
)
