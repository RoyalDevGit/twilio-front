import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { css } from '@emotion/react'

export const MainContainer = styled.div`
  position: relative;
`
interface ScrollableContainerProps {
  showScrollbar: boolean
  wrap: string
}
export const ScrollableContainer = styled.div<ScrollableContainerProps>`
  &::-webkit-scrollbar {
    display: none;
  }
  text-align: left;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1)};
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  white-space: ${({ wrap }) => (wrap === 'true' ? 'pre-wrap' : 'nowrap')};
  flex: 8;
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    overflow: ${({ showScrollbar }) => (showScrollbar ? 'scroll' : 'hidden')};
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    overflow: scroll;
  }
`
interface IntersectionObserverSpanProps {
  show: boolean
}
export const IntersectionObserverSpan = styled.span<IntersectionObserverSpanProps>`
  font-size: 1px;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`

export const ArrowButton = styled(IconButton)`
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.customComponents.horizontalScrollableContainer.arrowButton.normalState
      .styleOverrides.backgroundColor};
  border: ${({ theme }) =>
    `1px solid ${theme.customComponents.horizontalScrollableContainer.arrowButton.normalState.styleOverrides.borderColor}`};
  height: 32px;
  width: 32px;
  :hover {
    background-color: ${({ theme }) =>
      theme.customComponents.horizontalScrollableContainer.arrowButton
        .hoverState.styleOverrides.backgroundColor};
    border: ${({ theme }) =>
      `1px solid ${theme.customComponents.horizontalScrollableContainer.arrowButton.hoverState.styleOverrides.borderColor}`};
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    display: none;
  }
`

interface ArrowButtonContainerProps {
  direction: 'right' | 'left'
}

export const ArrowButtonContainer = styled.div<ArrowButtonContainerProps>`
  position: absolute;
  z-index: 1;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 0;
  ${({ theme, direction }) => {
    if (direction === 'left') {
      return css`
        left: 0;
        align-items: flex-start;
        background: ${theme.customComponents.horizontalScrollableContainer
          .arrowButtonContainer.left.styleOverrides.background};
      `
    }
    return css`
      right: 0;
      align-items: flex-end;
      background: ${theme.customComponents.horizontalScrollableContainer
        .arrowButtonContainer.right.styleOverrides.background};
    `
  }};
`
