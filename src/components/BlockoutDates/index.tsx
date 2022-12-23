import { useTranslation } from 'next-i18next'
import { FC, useCallback, useState } from 'react'
import { DateTime } from 'luxon'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AddBlockoutDatesButton,
  BlockoutDatesContainer,
  BlockoutDatesDialog,
  DialogContainer,
  DialogDescription,
  DialogButton,
  DialogCloseIcon,
  DialogContentInfo,
  DialogTitleContainer,
  CustomDialogTitle,
  StaticCalendar,
  StaticCalendarContainer,
  BlockoutDateList,
  BlockoutDateItem,
  BlockoutDateLabel,
  DeleteIconButton,
  DialogButtonBox,
} from 'components/BlockoutDates/styles'
import { CloseCircleIcon } from 'icons/Close'
import { BlockoutDate } from 'interfaces/BlockoutDate'
import { FormError } from 'components/Form/Error'
export interface BlockoutDatesProps {
  value: Partial<BlockoutDate>[]
  onAdd?: (date: DateTime) => unknown
  onRemove?: (blockoutDate: Partial<BlockoutDate>) => unknown
  error?: string
}

export const BlockoutDates: FC<BlockoutDatesProps> = ({
  value,
  onAdd,
  onRemove,
  error,
}) => {
  const { t } = useTranslation([LocaleNamespace.ExpertAvailabilitySettings])
  const [calendarValue, setCalendarValue] = useState<DateTime | null>(
    DateTime.now()
  )
  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const openAddDialog = () => {
    setAddDialogIsOpen(true)
  }

  const closeAddDialog = () => {
    setAddDialogIsOpen(false)
    setCalendarValue(null)
  }

  const handleAdd = useCallback(() => {
    if (!calendarValue) {
      return
    }
    if (onAdd) {
      onAdd(calendarValue)
    }
    closeAddDialog()
  }, [calendarValue])

  const handleRemove = (blockoutDate: Partial<BlockoutDate>) => {
    if (onRemove) {
      onRemove(blockoutDate)
    }
  }

  return (
    <BlockoutDatesContainer>
      <AddBlockoutDatesButton
        variant="contained"
        color="primary"
        endIcon={null}
        onClick={openAddDialog}
      >
        {t('blockoutDatesLabel')}
      </AddBlockoutDatesButton>
      <BlockoutDateList>
        {value.map((blockoutDate) => (
          <BlockoutDateItem key={blockoutDate.id || blockoutDate.date}>
            <BlockoutDateLabel>
              {DateTime.fromISO(blockoutDate.date as string).toLocaleString(
                DateTime.DATE_FULL
              )}
            </BlockoutDateLabel>
            <DeleteIconButton onClick={() => handleRemove(blockoutDate)}>
              <CloseCircleIcon />
            </DeleteIconButton>
          </BlockoutDateItem>
        ))}
      </BlockoutDateList>

      <BlockoutDatesDialog open={addDialogIsOpen}>
        <DialogContainer>
          <DialogCloseIcon onClick={closeAddDialog}>
            <CloseCircleIcon />
          </DialogCloseIcon>
          <DialogContentInfo>
            <DialogTitleContainer>
              <CustomDialogTitle>
                {t('selectBlockoutDatesLabel')}
              </CustomDialogTitle>
              <DialogDescription>
                {t('blockoutDatesExplanation')}
              </DialogDescription>
            </DialogTitleContainer>
            <StaticCalendarContainer
              displayStaticWrapperAs="desktop"
              value={calendarValue}
              minDate={DateTime.now()}
              onChange={(newValue) => {
                const dateTime = newValue as DateTime
                setCalendarValue(dateTime)
              }}
              renderInput={(params) => <StaticCalendar {...params} />}
            />
            <DialogButtonBox>
              <DialogButton
                variant="contained"
                color="primary"
                onClick={handleAdd}
              >
                {t('blockoutDatesButtonLabel')}
              </DialogButton>
              {!!error && <FormError>{error}</FormError>}
            </DialogButtonBox>
          </DialogContentInfo>
        </DialogContainer>
      </BlockoutDatesDialog>
    </BlockoutDatesContainer>
  )
}
