import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'

import { CloseCircleIcon } from 'icons/Close'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AddButton,
  DeleteButtonSection,
  SessionDurationItem,
  DurationSelect,
  PriceInput,
  SessionDurationOptionsContainer,
  SessionSettingsInputLabel,
  SessionDurationOptionList,
  SmallTextField,
  SessionDurationBox,
} from 'components/SessionDurationOptions/styles'
import { useExpertAsserted } from 'hooks/useExpert'
import { PlusIcon } from 'icons/Plus'
import { FormError } from 'components/Form/Error'
import { SessionDurationOption } from 'interfaces/SessionDurationOption'
import { SessionDurationOptionError } from 'hooks/api/expert/useEditableSessionDurationOptions'

export interface SessionDurationOptionBuffer extends SessionDurationOption {
  tempId?: string
}

interface SessionDurationOptionsProps {
  options: Partial<SessionDurationOptionBuffer>[]
  onAdd?: () => unknown
  onRemove?: (option: Partial<SessionDurationOptionBuffer>) => unknown
  onDurationChange?: (
    option: Partial<SessionDurationOptionBuffer>,
    newDuration: number
  ) => unknown
  errors?: SessionDurationOptionError[]
}

export const SessionDurationOptions: FC<SessionDurationOptionsProps> = ({
  options,
  onAdd,
  onRemove,
  onDurationChange,
  errors,
}) => {
  const { t } = useTranslation(LocaleNamespace.SessionDurationOptions)
  const expert = useExpertAsserted()
  const handleRemove = (option: Partial<SessionDurationOptionBuffer>) => {
    if (onRemove) {
      onRemove(option)
    }
  }

  const handleDurationChange = (
    option: Partial<SessionDurationOptionBuffer>,
    e: SelectChangeEvent<unknown>
  ) => {
    if (onDurationChange) {
      onDurationChange(option, +(e.target.value as string))
    }
  }

  return (
    <SessionDurationOptionsContainer>
      <SessionDurationOptionList>
        {options.map((option, index) => {
          let calculatedPrice = (0).toFixed(2)
          if (option.duration && expert.hourlyRate) {
            const minutelyRate = expert.hourlyRate / 60
            calculatedPrice = (minutelyRate * option.duration).toFixed(2)
          }

          const error = errors?.find((e) => {
            if (e.option.tempId) {
              return e.option.tempId === option.tempId
            }
            if (e.option.id) {
              return e.option.id === option.id
            }
            return false
          })

          return (
            <SessionDurationItem key={`${option.id}-${index}`}>
              <SessionDurationBox>
                <Box>
                  <SessionSettingsInputLabel>
                    {t('duration')}
                  </SessionSettingsInputLabel>
                  <DurationSelect
                    value={option.duration}
                    onChange={(e) => handleDurationChange(option, e)}
                    error={!!error}
                  >
                    <MenuItem />
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={45}>45 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={90}>1 hour and 30 minutes</MenuItem>
                  </DurationSelect>
                </Box>
                <PriceInput>
                  <SessionSettingsInputLabel>
                    {t('priceInputLabel')}
                  </SessionSettingsInputLabel>
                  <SmallTextField
                    type="text"
                    variant="outlined"
                    value={calculatedPrice}
                    disabled
                    fullWidth
                    error={!!error}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </PriceInput>
                <DeleteButtonSection>
                  <IconButton onClick={() => handleRemove(option)}>
                    <CloseCircleIcon />
                  </IconButton>
                </DeleteButtonSection>
              </SessionDurationBox>
              {!!error && <FormError>{error.message}</FormError>}
            </SessionDurationItem>
          )
        })}
      </SessionDurationOptionList>
      <AddButton
        variant="text"
        onClick={onAdd}
        endIcon={<PlusIcon invertColor />}
      >
        {t('sessionDurationAddButtonLabel')}
      </AddButton>
    </SessionDurationOptionsContainer>
  )
}
