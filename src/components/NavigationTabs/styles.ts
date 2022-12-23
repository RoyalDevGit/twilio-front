import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'

export const StyledTabs = styled(Tabs)`
  .MuiButtonBase-root {
    text-transform: none;
  }

  && .MuiTab-root {
    color: ${({ theme }) => theme.palette.text.primary};
    opacity: 0.7;
    &.Mui-selected {
      opacity: 1;
    }
  }

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    .MuiTabs-flexContainer {
      justify-content: center;
    }
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    .MuiButtonBase-root.Mui-disabled {
      display: none;
    }
    .MuiTypography-root {
      font-size: 12px;
    }
  }
`

export const NavigationTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: inline;
  }
`
