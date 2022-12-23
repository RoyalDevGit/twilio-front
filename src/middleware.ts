// middleware.ts
import { NextApiResponse } from 'next'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, res: NextApiResponse) {
  if (!request.cookies.get('k')) {
    res.status(401).send({
      error: {
        message: 'Unauthorized',
      },
    })
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/auth/logout',
}
