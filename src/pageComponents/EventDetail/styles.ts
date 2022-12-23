import styled from '@emotion/styled'
import Container from '@mui/material/Container'

export const Cover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`
export const CoverToolbar = styled.div``
export const IconAndType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const CoverType = styled.div``

export const CoverEventName = styled.div`
  font-size: 3rem;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 2rem;
  }
`

export const Section = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(2)};

  :last-child {
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }
`
export const SectionContent = styled(Container)`
  height: 100%;
`

export const Details = styled.div`
  display: flex;
  height: 100%;
`
export const DateAndLocation = styled.div`
  flex: 1 1 auto;
  font-size: 1.25rem;
  > * {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    :last-child {
      margin-bottom: ${({ theme }) => theme.spacing(0)};
    }
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.125rem;
  }
`
export const DateSection = styled.div``
export const TimeSection = styled.div`
  opacity: 0.7;
`
export const VerticalSeparator = styled.div`
  height: 100%;
  width: 1px;
  background: rgba(255, 255, 255, 0.5);
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const ReserveSection = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-content: flex-start;
  }
`
export const DesktopActionButtonSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`
export const MobileActionButtonSection = styled(Section)`
  display: none;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: block;
  }
`
