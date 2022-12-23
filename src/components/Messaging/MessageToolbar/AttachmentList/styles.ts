import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'

import { Image } from 'components/Image'

export const AttachmentListContainer = styled.div`
  width: 100%;
`
interface FileContainerProps {
  width: number
  height: number
}
export const FileContainer = styled.div<FileContainerProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height + height * 0.2}px`};
  position: relative;
  position: relative;
  display: flex;
  flex-direction: column-reverse;

  .MuiIconButton-root {
    visibility: hidden;
  }
  :hover {
    .MuiIconButton-root {
      top: -2px;
      right: -14px;
      visibility: visible;
    }
  }
`

export const ImagePreview = styled(Image)`
  span {
    min-width: 100%;
    min-height: 100%;
    img {
      min-width: 100%;
      min-height: 100%;
    }
  }
  img {
    min-width: 100%;
    min-height: 100%;
  }
  height: 40px;
  width: 40px;
  border-radius: 4px;
`
export const ArrowButton = styled(IconButton)`
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.customComponents.horizontalScrollableContainer.arrowButton.normalState
      .styleOverrides.backgroundColor};
  border: ${({ theme }) =>
    `1px solid ${theme.customComponents.horizontalScrollableContainer.arrowButton.normalState.styleOverrides.borderColor}`};
  height: 24px;
  width: 24px;
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
  top: 5px;
`
