import { FC } from 'react'
import { motion } from 'framer-motion'

import { AuthReason } from 'interfaces/AuthReason'
import { GuestUserLoginFavoriteMessage } from 'components/GuestUserAuthReasonMessage/Favorite'
import { GuestUserLoginCheckoutMessage } from 'components/GuestUserAuthReasonMessage/Checkout'
import { GuestUserLoginUnauthorizedMessage } from 'components/GuestUserAuthReasonMessage/Unauthorized'

export interface GuestUserAuthReasonProps {
  authReason?: AuthReason
  isLogin: boolean
}

export const GuestUserAuthReason: FC<GuestUserAuthReasonProps> = ({
  authReason,
  isLogin,
}) => {
  let renderAuthMessage = null
  switch (authReason) {
    case AuthReason.ExpertFavorite:
      renderAuthMessage = <GuestUserLoginFavoriteMessage isLogin={isLogin} />
      break
    case AuthReason.InstantSession:
    case AuthReason.SessionBooking:
      renderAuthMessage = <GuestUserLoginCheckoutMessage isLogin={isLogin} />
      break
    case AuthReason.Unauthorized:
      renderAuthMessage = (
        <GuestUserLoginUnauthorizedMessage isLogin={isLogin} />
      )
      break
    default:
      break
  }

  return (
    <motion.div
      initial={true}
      animate={{ opacity: 1, scale: 1.1 }}
      transition={{ duration: 0.5, yoyo: 1 }}
    >
      {renderAuthMessage}
    </motion.div>
  )
}
