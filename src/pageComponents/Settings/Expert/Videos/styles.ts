import styled from '@emotion/styled'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/system/Box'
import DialogActions from '@mui/material/DialogActions'

interface LabelProps extends InputLabelProps {
  required?: boolean
}

export const ExpertVideosBody = styled.div``

export const ExpertVideosToolbar = styled.div`
  display: flex;
`

export const VideoDetailsMainTitle = styled.div`
  display: block;
  width: 300px;
`

export const VideoActions = styled.div`
  display: none;

  gap: 15px;
  gap: ${({ theme }) => theme.spacing(2)};
`
export const VideoDetailsTitle = styled(InputLabel)<LabelProps>`
  font-size: 0.938rem;
`

export const VideoDetailsInfo = styled.p`
  font-size: 0.813rem;
  margin-top: ${({ theme }) => theme.spacing(0.75)};
  margin-right: ${({ theme }) => theme.spacing(0)};
  margin-bottom: ${({ theme }) => theme.spacing(1.25)};
  margin-left: ${({ theme }) => theme.spacing(0)};
`

export const VideoTableRow = styled(TableRow)`
  &:hover {
    ${VideoActions} {
      display: flex;
    }

    ${VideoDetailsMainTitle} {
      display: none;
    }
  }
`
export const VideoTableCell = styled(TableCell)`
  text-align: left;
  vertical-align: middle;
`

export const VideoDetailsDialogTitle = styled.div`
  width: 300px;
`

export const VideoDetailsDialogBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

export const VideoDetailsDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: space-between;
`
