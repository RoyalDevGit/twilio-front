import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { useRouter } from 'hooks/useRouter'
import {
  BrowseButton,
  CalendarImage,
  ContainerSection,
  DisplayContainer,
  EmptyMessage,
} from 'components/Calendar/EmptySessionDisplay/styles'
import { LightOrDark } from 'components/LightOrDark'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

interface EmptySessionDisplayProps {
  instanceUse: 'Expert' | 'Consumer'
}

export const EmptySessionDisplay: FC<
  React.PropsWithChildren<EmptySessionDisplayProps>
> = (props) => {
  const { t } = useTranslation(LocaleNamespace.Calendar)
  const router = useRouter()
  return (
    <DisplayContainer>
      <ContainerSection>
        <LightOrDark
          light={
            <CalendarImage
              src="/static/img/calendar-image.svg"
              width={68}
              height={61}
              alt=""
            />
          }
          dark={
            <CalendarImage
              src="/static/img/calendar-image-dark.svg"
              width={68}
              height={61}
              alt=""
            />
          }
        />
        <EmptyMessage variant="h2">{t('noSessionsBooked')}</EmptyMessage>
        <BrowseButton
          variant="outlined"
          color="primary"
          onClick={() =>
            router.push(
              props.instanceUse === 'Consumer'
                ? '/explore'
                : '/settings/expert/availability'
            )
          }
        >
          {t(
            props.instanceUse === 'Consumer'
              ? 'browseExpertsLabel'
              : 'manageAvailabilityLabel'
          )}
        </BrowseButton>
      </ContainerSection>
    </DisplayContainer>
  )
}
