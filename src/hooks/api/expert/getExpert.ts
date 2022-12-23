import { IncomingMessage } from 'http'

import { NextApiRequestCookies } from 'next/dist/server/api-utils'

import { UserApi } from 'apis/UserApi'
import { User } from 'interfaces/User'
import logProviderFactory from 'utils/logger/logProviderFactory'
import { hasExpertRole } from 'utils/user/hasExpertRole'

const getCurrentExpert = async (
  user: User,
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  token?: string
) => {
  try {
    if (hasExpertRole(user)) {
      const expertResult = await UserApi.setServerRequest(req, token).getExpert(
        user.id
      )
      if (expertResult.ok()) {
        const expert = await expertResult.getData()
        return expert
      }
      const error = await expertResult.getError()
      logProviderFactory.logError(error)
    }
  } catch (e) {
    logProviderFactory.logError(e)
    return null
  }

  return null
}

export default getCurrentExpert
