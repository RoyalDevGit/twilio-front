import { FC } from 'react'
import { TabsProps } from '@mui/material/Tabs'

import { useRouter } from 'hooks/useRouter'
import {
  NavigationTabsContainer,
  StyledTabs,
} from 'components/NavigationTabs/styles'
import { parseRelativeUrl } from 'utils/url/parseRelativeUrl'

export const NavigationTabs: FC<TabsProps> = ({ value, ...props }) => {
  const router = useRouter()

  let finalValue = value
  if (!value) {
    const childList = props.children as JSX.Element[] | JSX.Element[][]
    const hrefs: (string | undefined)[] = []
    childList.forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => {
          const href = c?.props?.href as string | undefined
          if (href) {
            hrefs.push(href)
          }
        })
      } else {
        const href = child?.props?.href as string | undefined
        if (href) {
          hrefs.push(href)
        }
      }
    })

    if (router.asPath) {
      const tabIndex = hrefs.findIndex((href) => {
        if (!href) {
          return false
        }
        try {
          const currentUrl = parseRelativeUrl(router.asPath)
          const url = parseRelativeUrl(href)
          return url.pathname === currentUrl.pathname
        } catch (e) {
          return false
        }
      })
      finalValue = tabIndex
    }
  }

  return (
    <NavigationTabsContainer>
      <StyledTabs
        value={finalValue}
        variant="scrollable"
        scrollButtons="auto"
        {...props}
      />
    </NavigationTabsContainer>
  )
}
