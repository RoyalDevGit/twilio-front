import { ExpertMissedSessionApologyCTA } from 'components/NotificationCTAs/ExpertMissedSessionApologyCTA'
import { ExpertThankYouNoteCTA } from 'components/NotificationCTAs/ExpertThankYouNoteCTA'
import { InstantSessionConfirmationCTA } from 'components/NotificationCTAs/InstantSessionConfirmationCTA'
import { MissedSessionCTA } from 'components/NotificationCTAs/MissedSessionCTA'
import { NewCommentAndRatingCTA } from 'components/NotificationCTAs/NewCommentAndRatingCTA'
import { NewCommentCTA } from 'components/NotificationCTAs/NewCommentCTA'
import { NewCommentOnCommentCTA } from 'components/NotificationCTAs/NewCommentOnCommentCTA'
import { NewRatingCTA } from 'components/NotificationCTAs/NewRatingCTA'
import { RecordingAvailableCTA } from 'components/NotificationCTAs/RecordingAvailableCTA'
import { SessionCancelledByExpertCTA } from 'components/NotificationCTAs/SessionCancelledByExpertCTA'
import { SessionCancelledFailedPaymentCTA } from 'components/NotificationCTAs/SessionCancelledFailedPaymentCTA'
import { SessionCancelledFullRefundCTA } from 'components/NotificationCTAs/SessionCancelledFullRefundCTA'
import { SessionCancelledPartialRefundCTA } from 'components/NotificationCTAs/SessionCancelledPartialRefundCTA'
import { SessionCapturedPaymentCTA } from 'components/NotificationCTAs/SessionCapturedPaymentCTA'
import { SessionConfirmationCTA } from 'components/NotificationCTAs/SessionConfirmationCTA'
import { SessionFailedPaymentCTA } from 'components/NotificationCTAs/SessionFailedPaymentCTA'
import { SessionRescheduledCTA } from 'components/NotificationCTAs/SessionRescheduledCTA'
import { UpcomingSessionCTA } from 'components/NotificationCTAs/UpcomingSessionCTA'
import { WelcomeCTA } from 'components/NotificationCTAs/WelcomeCTA'
import { NotificationType, TrayNotification } from 'interfaces/TrayNotification'

export const renderNotificationCTA = (notification: TrayNotification) => {
  switch (notification.notificationType) {
    // 1
    case NotificationType.Welcome:
      return <WelcomeCTA notification={notification} />
      break
    // 1
    case NotificationType.SessionOrderConfirmation:
      return <SessionConfirmationCTA notification={notification} />
      break
    // 1
    case NotificationType.InstantSessionOrderConfirmation:
      return <InstantSessionConfirmationCTA notification={notification} />
      break
    // 1
    case NotificationType.SessionRescheduled:
      return <SessionRescheduledCTA notification={notification} />
      break
    // 1
    case NotificationType.SessionCancelledWithFullRefund:
      return <SessionCancelledFullRefundCTA notification={notification} />
      break
    // 1
    case NotificationType.SessionCancelledWithPartialRefund:
      return <SessionCancelledPartialRefundCTA notification={notification} />
      break
    // 1
    case NotificationType.SessionCancelledByExpert:
      return <SessionCancelledByExpertCTA notification={notification} />
      break
    // 1
    case NotificationType.SessionFailedPaymentCancellation:
      return <SessionCancelledFailedPaymentCTA notification={notification} />
      break
    // 1
    case NotificationType.FailedSessionPayment:
      return <SessionFailedPaymentCTA notification={notification} />
      break
    // 1
    case NotificationType.CapturedSessionPayment:
      return <SessionCapturedPaymentCTA notification={notification} />
      break
    // 1
    case NotificationType.MissedSession:
      return <MissedSessionCTA notification={notification} />
      break
    // 1
    case NotificationType.MissedSessionApology:
      return <ExpertMissedSessionApologyCTA notification={notification} />
      break
    // 1
    case NotificationType.RecordingAvailable:
      return <RecordingAvailableCTA notification={notification} />
      break
    // 1
    case NotificationType.ExpertComment:
      return <NewCommentCTA notification={notification} />
      break
    // 1
    case NotificationType.ExpertRating:
      return <NewRatingCTA notification={notification} />
      break
    // 1
    case NotificationType.ExpertCommentAndRating:
      return <NewCommentAndRatingCTA notification={notification} />
      break
    // 1
    case NotificationType.ExpertThankYouNoteConfig:
      return <ExpertThankYouNoteCTA notification={notification} />
      break
    // 1
    case NotificationType.CommentOnComment:
      return <NewCommentOnCommentCTA notification={notification} />
      break
    // 1
    case NotificationType.UpcomingSession:
      return <UpcomingSessionCTA notification={notification} />
      break
    default:
      return null
  }
}
