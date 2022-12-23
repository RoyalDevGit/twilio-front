import styled from '@emotion/styled'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'

interface LabelProps extends InputLabelProps {
  required?: boolean
}

export const FormLabel = styled(InputLabel)<LabelProps>``
