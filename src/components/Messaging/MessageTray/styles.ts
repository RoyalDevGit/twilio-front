import styled from '@emotion/styled'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

export const MessageTrayEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
`

export const MessageTrayEmptyStateLabel = styled(Typography)`
  font-weight: 500;
  text-align: center;
`

export const MessageTrayMenu = styled(Menu)`
  .MuiPaper-root {
    width: 277px;
  }
  margin-top: ${({ theme }) => theme.spacing(1)};
  .MuiList-root {
    padding: ${({ theme }) => theme.spacing(0)};
  }
`

export const MessageTrayBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(9.5)};
  padding: ${({ theme }) => theme.spacing(2)};
`

export const MessageTrayTitle = styled(Typography)`
  font-size: 1.25rem;
`

export const MessageTrayLabel = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 600;
`

export const MessageTrayContactContainer = styled.div`
  padding-left: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1)};
`
