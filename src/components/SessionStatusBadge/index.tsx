import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'

import { StyledBadge } from 'components/SessionStatusBadge/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  Session,
  SessionAttendanceResult,
  SessionStatus,
} from 'interfaces/Session'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export interface SessionStatusBadgeProps {
  session: Session
}

interface StatusColor {
  backgroundColor: string
  textColor: string
}

type ColorMap = Record<string, StatusColor>

export const SessionStatusBadge: NextPage<SessionStatusBadgeProps> = ({
  session,
}) => {
  const useDarkMode = usePrefersDarkMode()
  const { t } = useTranslation(LocaleNamespace.SessionStatusBadge)

  const joinableResult = isSessionJoinable(session)

  let colorMap: ColorMap
  if (useDarkMode) {
    colorMap = {
      active: {
        backgroundColor: '#3FA3FF',
        textColor: '#1A1A1A',
      },
      readyToJoin: { backgroundColor: '#3FA3FF', textColor: '#1A1A1A' },
      noShow: {
        backgroundColor: '#CA5847',
        textColor: '#FFFFFF',
      },
      missingPayment: {
        backgroundColor: '#CA5847',
        textColor: '#FFFFFF',
      },
      upcoming: { backgroundColor: '#ABD1F5', textColor: '#1A1A1A' },
      ended: { backgroundColor: '#0DC181', textColor: '#1A1A1A' },
      cancelled: {
        backgroundColor: '#B8CEE3',
        textColor: '#1A1A1A',
      },
      unknown: {
        backgroundColor: 'rgba(171, 209, 245, 1)',
        textColor: '#1A1A1A',
      },
    }
  } else {
    colorMap = {
      active: { backgroundColor: '#3365EF', textColor: '#FFFFFF' },
      readyToJoin: { backgroundColor: '#3365EF', textColor: '#FFFFFF' },
      noShow: { backgroundColor: '#CA5847', textColor: '#FFFFFF' },
      missingPayment: { backgroundColor: '#CA5847', textColor: '#FFFFFF' },
      upcoming: { backgroundColor: '#ABD1F5', textColor: '#1A1A1A' },
      ended: {
        backgroundColor: '#81c6ad',
        textColor: '#1A1A1A',
      },
      cancelled: { backgroundColor: '#D7ECFF', textColor: '#1A1A1A' },
      unknown: {
        backgroundColor: '#abd1f5',
        textColor: '#1A1A1A',
      },
    }
  }

  let pulsate = false
  let sessionStatus = ''
  let statusColor: StatusColor = colorMap['unknown']
  if (joinableResult.joinable) {
    pulsate = true
    if (session.status === SessionStatus.Active) {
      sessionStatus = t('active')
      statusColor = colorMap['active']
    } else {
      sessionStatus = t('readyToJoin')
      statusColor = colorMap['readyToJoin']
    }
  } else {
    if (session.attendanceResult) {
      switch (session.attendanceResult) {
        case SessionAttendanceResult.AllPresent:
          sessionStatus = t('ended')
          statusColor = colorMap['ended']
          break
        case SessionAttendanceResult.NoneShowed:
        case SessionAttendanceResult.NoShowExpert:
        case SessionAttendanceResult.NoShowConsumer:
          sessionStatus = t('noshow')
          statusColor = colorMap['noShow']
          break
        default:
          sessionStatus = t('unknown')
          statusColor = colorMap['unknown']
          break
      }
    } else {
      if (joinableResult.reason === 'failed_payment') {
        sessionStatus = t('failedPayment')
        statusColor = colorMap['missingPayment']
      } else if (joinableResult.reason === 'no_payment') {
        sessionStatus = t('requiresPayment')
        statusColor = colorMap['missingPayment']
      } else {
        switch (session.status) {
          case SessionStatus.Active:
            sessionStatus = t('ended')
            statusColor = colorMap['ended']
            break
          case SessionStatus.NotStarted:
            if (joinableResult.reason === 'past') {
              sessionStatus = t('noshow')
              statusColor = colorMap['noShow']
            } else {
              sessionStatus = t('upcoming')
              statusColor = colorMap['upcoming']
            }
            break
          case SessionStatus.Ended:
            sessionStatus = t('ended')
            statusColor = colorMap['ended']
            break
          case SessionStatus.Cancelled:
            sessionStatus = t('cancelled')
            statusColor = colorMap['cancelled']
            break
          default:
            sessionStatus = t('unknown')
            statusColor = colorMap['unknown']
            break
        }
      }
    }
  }

  return (
    <StyledBadge
      textColor={statusColor.textColor}
      backgroundColor={statusColor.backgroundColor}
      pulsate={pulsate}
    >
      {sessionStatus}
    </StyledBadge>
  )
}
