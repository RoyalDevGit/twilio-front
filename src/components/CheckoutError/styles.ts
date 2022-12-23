import styled from '@emotion/styled'

import { ExclamationCircular } from 'icons/ExclamationCircular'

export const CheckoutErrorContainer = styled.div`
  width: 501px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 2px solid #ea5230;
  border-left: 8px solid #ea5230;
  border-radius: 3px;
  padding-top: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(2)};

  svg {
    margin-left: ${({ theme }) => theme.spacing(1)};
    margin-right: ${({ theme }) => theme.spacing(1)};
  }

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 602px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 366px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    width: 316px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    width: 266px;
  }
`

export const ExclamationIcon = styled(ExclamationCircular)``
