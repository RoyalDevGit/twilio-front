import { FC } from 'react'
import { LinkProps as MaterialLinkProps } from '@mui/material/Link'
// eslint-disable-next-line no-restricted-imports
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import { StyledLink } from 'components/Link/styles'

interface CustomLinkProps {
  hrefAs?: string
}

type CombinedLinkProps = CustomLinkProps & NextLinkProps & MaterialLinkProps

export type LinkProps = React.PropsWithChildren<CombinedLinkProps>

export const Link: FC<LinkProps> = ({
  className,
  children,
  tabIndex,
  href,
  hrefAs,
  prefetch,
  replace,
  scroll,
  ...otherProps
}) => {
  const anchorProps = otherProps as MaterialLinkProps
  return (
    <NextLink
      href={href}
      as={hrefAs}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      passHref
      legacyBehavior={true}
    >
      <StyledLink className={className} tabIndex={tabIndex} {...anchorProps}>
        {children}
      </StyledLink>
    </NextLink>
  )
}
