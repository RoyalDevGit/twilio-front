import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { ArrowButtonContainer } from 'components/HorizontalScrollableContainer/styles'

export const DurationContainer = styled.div`
  padding: 0 24px;
  padding-top: 8px;
  ${ArrowButtonContainer} {
    width: 20px;
  }
`

export const DurationLengthText = styled(Typography)`
  font-size: 1.25rem;
  padding-top: 10px;
  line-height: 1;
`

export const DurationTimeTypeText = styled(Typography)`
  font-size: 0.75rem;
`

export const DurationPrice = styled(Typography)`
  font-size: 1.25rem;
`
export const Divider = styled.span`
  opacity: 0.2;
  border: 1px solid #5c6e9f;
  width: 46px;
  height: 0px;
  margin: 4px 0;
`
