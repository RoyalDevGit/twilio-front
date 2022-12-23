import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Typography from '@mui/material/Typography'
import {
  LocalVideo,
  RemoteVideo,
} from 'amazon-chime-sdk-component-library-react'

import { UserAvatar } from 'components/UserAvatar'

export const StyledRemoteVideo = styled(RemoteVideo)`
  && {
  }
`

export const StyledLocalVideo = styled(LocalVideo)`
  && {
    position: absolute;
    right: 0;
    bottom: 116px;
    width: 300px;
    height: 168.75px;

    ${({ theme }) => theme.breakpoints.down('tablet')} {
      width: 180px;
      height: 90px;
    }
  }
`

export const VideoTileContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  position: relative;
  vertical-align: middle;
  align-self: center;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  animation: show 0.4s ease;
`

export const NoRemoteVideoContainer = styled(VideoTileContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`

export const NoRemoteVideoAvatar = styled(UserAvatar)(
  () => css`
    /* min-width: 72px;
    max-width: 148px;
    width: 100%;
    height: auto; */
    /* aspect-ratio: 1 / 1; */
  `
)

export const NoRemoteVideoNameTag = styled(Typography)``

export interface TileSize {
  width: number
  height: number
}

export interface MeetingGridProps {
  tileSize: TileSize
}

export const MeetingGrid = styled.div<MeetingGridProps>(
  ({ tileSize, theme }) => css`
    background-color: ${theme.palette.background.default};
    overflow: auto;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    justify-content: center;
    vertical-align: middle;
    flex: 1;
    border-radius: 10px;

    > * {
      width: ${tileSize.width}px;
      height: ${tileSize.height}px;
    }

    ${NoRemoteVideoNameTag} {
      display: ${tileSize.width > 150 ? 'block' : 'none'};
    }
  `
)

export const VideosSideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  && > * {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }
`

export const ContentShareGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 218px;
    gap: 12px;

    ${theme.breakpoints.down('laptopL')} {
      grid-template-columns: 1fr;

      ${VideosSideBar} {
        display: none;
      }
    }
  `
)

export const ContentShareSection = styled.div`
  width: 100%;
  height: 100%;

  ${VideoTileContainer} {
    width: 100%;
    height: 100%;
  }
`
