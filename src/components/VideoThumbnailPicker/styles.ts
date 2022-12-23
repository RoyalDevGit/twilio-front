import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'

interface ThumbnailPickerProps {
  disabled?: boolean
}

export const ThumbnailPicker = styled.div<ThumbnailPickerProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

interface ThumbnailOptionProps {
  selected: boolean
}

export const ThumbnailOption = styled(ButtonBase)<ThumbnailOptionProps>`
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`

export const ThumbnailImage = styled.img`
  max-width: 100px;
`
