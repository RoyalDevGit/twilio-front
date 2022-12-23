import styled from '@emotion/styled'

export const DateSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: -90px;
  right: 0px;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    margin-top: ${({ theme }) => theme.spacing(2)};
    position: static;
    justify-content: center;
    align-items: center;
  }
`
