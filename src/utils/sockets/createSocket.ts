import urlJoin from 'proper-url-join'
import { io, ManagerOptions, SocketOptions } from 'socket.io-client'

import { Config } from 'utils/config'
const API_URL = Config.getString('API_URL')

export const createSocket = (
  namespace = '/',
  opts?: Partial<ManagerOptions & SocketOptions> | undefined
) => {
  const socket = io(urlJoin(API_URL, namespace), {
    ...opts,
    withCredentials: true,
  })
  return socket
}
