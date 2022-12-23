import type { NextApiRequest, NextApiResponse } from 'next'

import { sessionLogout } from 'server/utils/auth/session'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sessionLogout(req, res)
  res.status(204)
  res.send('')
}
