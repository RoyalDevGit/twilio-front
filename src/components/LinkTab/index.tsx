import Tab, { TabProps } from '@mui/material/Tab'
import { FC } from 'react'

import { Link, LinkProps } from 'components/Link'

interface CustomTabProps extends Omit<TabProps, 'component' | 'passHref'> {
  component?: FC<LinkProps>
}

export type LinkTabProps = CustomTabProps & LinkProps

export const LinkTab: FC<LinkTabProps> = (props) => (
  <Link href={props.href}>
    <Tab label={props.label} id={props.id} />
  </Link>
)
