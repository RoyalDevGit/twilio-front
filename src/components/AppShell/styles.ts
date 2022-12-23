import styled from '@emotion/styled'
import Div100vh from 'react-div-100vh'

export const AppShellGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-template-areas: 'drawer main';
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: 1fr;
    grid-template-areas: 'main';
  }
`

export const AppShellMain = styled(Div100vh)`
  grid-area: main;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'body'
    'mobileNavigation';
`

export const AppShellDrawer = styled.div`
  grid-area: drawer;

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    display: none;
  }
`

export const AppShellBody = styled.div`
  grid-area: body;
  overflow: auto;
  height: 100%;
`

export const AppShellMobileNavigation = styled.div`
  grid-area: mobileNavigation;
`
