import merge from 'lodash/merge'

import { AppGetServerSideProps } from 'interfaces/AppContext'
import { AppState } from 'interfaces/AppState'
import { buildInitialStateFromRequest } from 'utils/state/buildInitialStateFromRequest'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { getCookieServerSide } from 'utils/cookies/cookieUtils'
import { Config } from 'utils/config'
const TOKEN_COOKIE_NAME = Config.getString('TOKEN_COOKIE_NAME')

export const disallowAuth =
  (getServerSideProps: AppGetServerSideProps): AppGetServerSideProps =>
  async (ctx) => {
    const { query, req } = ctx

    const accessToken = getCookieServerSide<string>(req, TOKEN_COOKIE_NAME)
    if (accessToken) {
      return {
        redirect: {
          destination: urlJoinWithQuery('/', query),
          permanent: false,
        },
      }
    }

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
