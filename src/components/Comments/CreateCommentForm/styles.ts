import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

export const CommentTitle = styled(Typography)`
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const CommentFormContainer = styled.div`
  width: 60%;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 100%;
  }
`

export const CommentFormInputs = styled.div`
  width: 100%;
`

export const CommentContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const RatingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const TextFieldLabel = styled(Typography)`
  font-size: 0.813rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const CommentFormButtonGroup = styled.div`
  min-height: 40px;
  text-align: right;
  padding: ${({ theme }) => theme.spacing(2, 0)};
  button:first-child {
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-top: ${({ theme }) => theme.spacing(1)};
  }
`
export const CommentFormField = styled(TextField)`
  .MuiInputBase-root {
    fieldset.MuiOutlinedInput-notchedOutline {
      border: 1px solid #d5d8df;
      border-radius: 4px;
    }
    outline: #d5d8df solid 1px;
  }
  .Mui-focused {
    outline: ${({ theme }) => `${theme.palette.primary.main} solid 1px`};
  }
`
