import { useRef } from 'react'
import { ManagerOptions, Socket, SocketOptions } from 'socket.io-client'

import { createSocket } from 'utils/sockets/createSocket'

export const useSocket = (
  namespace = '/',
  opts?: Partial<ManagerOptions & SocketOptions> | undefined
) => {
  const socketRef = useRef<Socket>()

  if (!socketRef.current) {
    socketRef.current = createSocket(namespace, opts)
  }

  return socketRef.current
}
