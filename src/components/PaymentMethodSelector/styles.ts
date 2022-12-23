import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const CardsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const CardSelectionItem = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`

export const CardSelectionItemFormControlLabel = styled(FormControlLabel)`
  align-items: flex-start;
  margin-left: ${({ theme }) => theme.spacing(0)};
  gap: ${({ theme }) => theme.spacing(1.5)};
  .MuiFormControlLabel-label {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
    width: 100%;
  }

  .MuiRadio-root {
    padding: 0;
  }
`

export const CardItemLabelSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const CardSelectionLabelLogo = styled.div``

export const CardDescriptionSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`

export const CardSelectionLabelDescription = styled.div``

export const EndingInLabel = styled.div`
  display: flex;
  align-items: center;
  white-space: pre;
`

export const CardBrand = styled(Typography)`
  text-transform: capitalize;
`

export const CardSelectionItemDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const AddNewCardSection = styled.div`
  display: flex;
  align-items: center;
  color: #293f98;
`

export const AddNewCardButton = styled(Button)`
  height: 48px;
`

export const DefaultCardSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const DefaultLabelSection = styled.div`
  max-width: fit-content;
  max-height: 28px;
  text-align: center;
  background: #b8cee3;
  border-radius: 40px;
  color: #1a1a1a;

  p {
    padding-right: 10px;
    padding-left: 10px;
  }
`
export const PaymentFailedSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const PaymentFailedLabel = styled.div`
  max-width: fit-content;
  max-height: 28px;
  text-align: center;
  background: #ea5230;
  border-radius: 40px;
  color: #1a1a1a;

  p {
    padding-right: 10px;
    padding-left: 10px;
  }
`
