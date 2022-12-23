import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const PaymentFormStepContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 100%;
`

export const FormStepFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const AmountLabel = styled(Typography)`
  font-size: 1.125rem;
`

export const PaymentFormBody = styled.div`
  flex: 1 1 auto;
`
