/* eslint-disable import/no-default-export */
import { FC } from 'react'
import dynamic from 'next/dynamic'

import { useCurrentUser } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'

const AppWideComponents = dynamic(() => import('./AppWideComponents'))

const AppWideComponentsWrapper: FC = () => {
  const user = useCurrentUser()
  const isGuest = isGuestUser(user)

  /**
   * Next.js supports lazy loading external libraries with import() and React components with next/dynamic.
   * Deferred loading helps improve the initial loading performance by decreasing the amount of JavaScript necessary to render the page.
   * Components or libraries are only imported and included in the JavaScript bundle when they're used.
   * https://nextjs.org/docs/advanced-features/dynamic-import
   */
  if (!isGuest) {
    return <AppWideComponents />
  }

  return <></>
}

export default AppWideComponentsWrapper
