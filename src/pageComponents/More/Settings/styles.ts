import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'

export const MorePageSettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(1.5)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`

export const MorePageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const IconButtonBox = styled(IconButton)`
  position: absolute;
  left: 0;
`

export const MorePageLinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`
