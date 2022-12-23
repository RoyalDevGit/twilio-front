import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  SessionConfirmedContainer,
  CustomUserAvatar,
  InformationContainer,
  RescheduleSuccessfulStepContainer,
  SessionConfirmedExpertLabel,
  SessionConfirmedInformation,
  SessionConfirmedLabel,
  AvatarContainer,
} from 'components/Dialogs/RescheduleSessionDialog/Steps/RescheduleSuccessfulStep/styles'
import { SuccessCheckmarkIcon } from 'icons/SuccessCheckmark'
import { getUserFullName } from 'utils/user/getUserFullName'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { CalendarDottedIcon } from 'icons/Calendar/DottedCalendar'
import { User } from 'interfaces/User'
import { Session } from 'interfaces/Session'

interface RescheduleSuccessfulStepProps {
  displayUser: User
  confirmedSession: Session | null
}

export const RescheduleSuccessfulStep: FC<RescheduleSuccessfulStepProps> = ({
  displayUser,
  confirmedSession,
}) => {
  const { t } = useTranslation(LocaleNamespace.UpcomingSessions)
  const fullName = getUserFullName(displayUser)
  const displayDate = confirmedSession
    ? DateTime.fromISO(confirmedSession.startDate.date)
    : DateTime.now()
  return (
    <RescheduleSuccessfulStepContainer>
      <SuccessCheckmarkIcon />
      <SessionConfirmedContainer>
        <SessionConfirmedLabel>
          {t('sessionRescheduledLabel')}
        </SessionConfirmedLabel>
        <SessionConfirmedExpertLabel>{`${t(
          'withLabel'
        )} ${fullName}`}</SessionConfirmedExpertLabel>
        <AvatarContainer>
          <CustomUserAvatar
            alt={fullName}
            src={getUserPictureUrl(displayUser)}
            firstName={displayUser.firstName}
            lastName={displayUser.lastName}
            width={104.4}
            height={104.4}
          />
        </AvatarContainer>
      </SessionConfirmedContainer>

      <InformationContainer>
        <CalendarDottedIcon />
        <SessionConfirmedInformation>
          {`${displayDate.weekdayShort}, ${displayDate.monthShort} ${displayDate.day} ${displayDate.year}`}
        </SessionConfirmedInformation>
        <SessionConfirmedInformation>
          {confirmedSession &&
            `${displayDate.toFormat('hh:mm a')} - ${displayDate
              .plus({ minutes: confirmedSession.duration })
              .toFormat('hh:mm a')} ${displayDate.offsetNameShort}`}
        </SessionConfirmedInformation>
        <SessionConfirmedInformation>
          {`1 ${t('sessionHourLabel')}`}
        </SessionConfirmedInformation>
        <SessionConfirmedInformation>
          {`${t('sessionTotalLabel')} $${
            confirmedSession?.order.totalPrice.amount ?? 0
          }`}
        </SessionConfirmedInformation>
      </InformationContainer>
    </RescheduleSuccessfulStepContainer>
  )
}
