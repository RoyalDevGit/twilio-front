import merge from 'lodash/merge'
import { ParsedUrlQuery } from 'querystring'

// import { UserApi } from 'apis/UserApi'
import { AppGetServerSideProps } from 'interfaces/AppContext'
import { AppState } from 'interfaces/AppState'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
// import { hasExpertRole } from 'utils/user/hasExpertRole'
import { buildInitialStateFromRequest } from 'utils/state/buildInitialStateFromRequest'
import {
  getAccessTokenCookie,
  getExpertCookie,
  getUserCookie,
} from 'utils/cookies/cookieUtils'
import { UserApi } from 'apis/UserApi'

export interface RequireAuthOptions {
  allowGuests: boolean
  fetchUserDetails?: boolean
}

export const requireAuth =
  (
    getServerSideProps: AppGetServerSideProps,
    options: RequireAuthOptions = {
      allowGuests: false,
      fetchUserDetails: false,
    }
  ): AppGetServerSideProps =>
  async (ctx) => {
    const { query, resolvedUrl, req } = ctx
    const { allowGuests, fetchUserDetails } = options

    const redirectToLogin = (queryParams: ParsedUrlQuery = {}) => {
      const loginUrl = urlJoinWithQuery('/login', {
        redirectTo: resolvedUrl,
        ...queryParams,
      })
      return {
        redirect: {
          destination: loginUrl,
          permanent: false,
        },
      }
    }

    const accessToken = getAccessTokenCookie(req)

    /**
     * If they are not logged in, but this page allows anon users, we can let them pass
     */
    if (!accessToken && allowGuests) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rtn = (await getServerSideProps(ctx)) as { [key: string]: any }
      const initialState: Partial<AppState> = buildInitialStateFromRequest(req)
      const defaultProps = {
        initialState,
      }
      const props = merge({}, rtn['props'], defaultProps)
      return {
        ...rtn,
        props,
      }
    }

    /**
     * If they are not logged in, but we don't allow guest to see this page, we just redirect them.
     */
    if (!accessToken) {
      return redirectToLogin()
    }

    /**
     * If they have an access token, let's check to see if there is data associated with their account
     */
    let user = getUserCookie(req)
    let expert = getExpertCookie(req)

    /**
     * There are instances such as the profile section where we want the full details of the user
     */
    if (fetchUserDetails) {
      const userDetails = await UserApi.setServerRequest(req).getDetails()
      if (userDetails.ok()) {
        const userData = await userDetails.getData()
        user = userData.user
        expert = userData.expert
      }
    }

    ctx.user = user
    ctx.expert = expert

    const { redirectTo, ...queryRest } = query

    if (redirectTo) {
      return {
        redirect: {
          destination: urlJoinWithQuery(redirectTo, queryRest),
          permanent: false,
        },
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rtn = (await getServerSideProps(ctx)) as { [key: string]: any }
    const initialState: Partial<AppState> = buildInitialStateFromRequest(req)
    initialState.user = user
    initialState.expert = expert
    const defaultProps = {
      initialState,
    }

    return {
      ...rtn,
      props: merge({}, rtn['props'], defaultProps),
    }
  }
