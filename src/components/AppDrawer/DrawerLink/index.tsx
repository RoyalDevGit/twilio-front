import { FC } from 'react'
import classNames from 'classnames'

import { useRouter } from 'hooks/useRouter'
import { Link, LinkProps } from 'components/Link'
import { isActivePath } from 'utils/url/isActivePath'

export type DrawerLinkProps = LinkProps

const activeClass = 'drawer-link-active'
export const drawerLinkActiveClass = `.${activeClass}`

export const DrawerLink: FC<React.PropsWithChildren<DrawerLinkProps>> = ({
  href,
  className,
  ...otherLinkProps
}) => {
  const router = useRouter()
  const isActive = isActivePath(router.asPath, href)

  return (
    <Link
      {...otherLinkProps}
      href={href}
      className={classNames(className, isActive ? activeClass : '')}
    />
  )
}
