import styled from '@emotion/styled'

export const EventListContainer = styled.div``

export const EventGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas: 'date-details name-details action';
  grid-template-columns: 165px 1fr auto;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  background: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  padding-top: ${({ theme }) => theme.spacing(3)};
  padding-right: ${({ theme }) => theme.spacing(8)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(1.5)};
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'name-details action';
    padding-top: ${({ theme }) => theme.spacing(2)};
    align-items: flex-start;
  }
`
export const DesktopDateDetails = styled.div`
  grid-area: date-details;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`
export const DateSection = styled.div`
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`

export const MobileDate = styled.div`
  display: none;
  font-size: 0.813rem;
  color: rgba(255, 255, 255, 0.7);

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: block;
  }
`

export const TimesSection = styled.div`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
`

export const EventNameDetails = styled.div`
  grid-area: name-details;
  display: flex;
  align-items: center;
`

export const EventTypeAndLabel = styled.div`
  margin-right: ${({ theme }) => theme.spacing(3)};
`

export const EventLabel = styled.div`
  font-size: 1.5rem;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.125rem;
  }
`

export const ActionSection = styled.div`
  grid-area: action;
  text-align: center;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-top: ${({ theme }) => theme.spacing(0.5)};
  }
`
