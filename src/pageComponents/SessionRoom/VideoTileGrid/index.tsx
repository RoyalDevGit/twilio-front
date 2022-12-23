import {
  ContentShare,
  LocalVideo,
  RosterAttendeeType,
  useContentShareState,
  useRemoteVideoTileState,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react'
import React, { useEffect, useState } from 'react'
import { useElementSize } from 'usehooks-ts'
import Draggable from 'react-draggable'

import { User } from 'interfaces/User'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import {
  ContentShareGrid,
  ContentShareSection,
  MeetingGrid,
  NoRemoteVideoAvatar,
  NoRemoteVideoContainer,
  NoRemoteVideoNameTag,
  StyledLocalVideo,
  StyledRemoteVideo,
  TileSize,
  VideosSideBar,
  VideoTileContainer,
} from 'pageComponents/SessionRoom/VideoTileGrid/styles'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'

export interface RosterAttendee extends RosterAttendeeType {
  user?: User
}

interface RemoteVideosProps {
  attendees: RosterAttendee[]
  avatarWidth: number
  avatarHeight: number
}

const RemoteVideos: React.FC<RemoteVideosProps> = ({
  attendees,
  avatarHeight,
  avatarWidth,
}) => {
  const currentUser = useCurrentUserAsserted()
  const { attendeeIdToTileId } = useRemoteVideoTileState()

  return (
    <>
      {attendees.map((attendee) => {
        const tileId = attendeeIdToTileId[attendee.chimeAttendeeId]

        if (!tileId) {
          if (!attendee.user || attendee.user.id === currentUser.id) {
            return null
          }
          const profilePictureUrl = getUserProfilePictureUrl(attendee.user)

          return (
            <NoRemoteVideoContainer key={attendee.chimeAttendeeId}>
              <NoRemoteVideoAvatar
                firstName={attendee.user.firstName}
                lastName={attendee.user.lastName}
                src={profilePictureUrl}
                width={avatarWidth}
                height={avatarHeight}
              />

              <NoRemoteVideoNameTag>
                {`${attendee.user.firstName} ${attendee.user.lastName}`}
              </NoRemoteVideoNameTag>
            </NoRemoteVideoContainer>
          )
        }
        return (
          <VideoTileContainer key={tileId}>
            <StyledRemoteVideo
              tileId={tileId}
              name={
                attendee.user
                  ? `${attendee.user.firstName} ${attendee.user.lastName}`
                  : ''
              }
            />
          </VideoTileContainer>
        )
      })}
    </>
  )
}

export const VideoTileGrid: React.FC = () => {
  const { roster } = useRosterState()
  const attendees = Object.values(roster) as RosterAttendeeType[]
  const { sharingAttendeeId } = useContentShareState()
  const [setMeetingGridRef, meetingGridSize] = useElementSize()
  const [tileSize, setTileSize] = useState<TileSize>({ width: 0, height: 0 })

  const ratio = 9 / 16

  const area = (increment: number) => {
    let i = 0
    let w = 0
    let h = increment * ratio
    while (i < attendees.length) {
      if (w + increment > meetingGridSize.width) {
        w = 0
        h = h + increment * ratio
      }
      w = w + increment
      i++
    }
    if (h > meetingGridSize.height || increment > meetingGridSize.width) {
      return false
    }
    return increment
  }

  const resizer = (width: number) => {
    for (let s = 0; s < attendees.length; s++) {
      // calculate dimensions
      const elemWidth = width
      const elemHeight = width * ratio

      setTileSize({
        width: elemWidth,
        height: elemHeight,
      })
    }
  }

  useEffect(() => {
    let max = 0
    let i = 1
    while (i < 5000) {
      const areaValue = area(i)
      if (areaValue === false) {
        max = i - 1
        break
      }
      i++
    }
    resizer(max)
  }, [roster, meetingGridSize])

  const contentIsBeingShared = !!sharingAttendeeId

  if (contentIsBeingShared) {
    return (
      <ContentShareGrid>
        <ContentShareSection>
          <VideoTileContainer>
            <ContentShare />
          </VideoTileContainer>
        </ContentShareSection>
        <VideosSideBar>
          <RemoteVideos
            avatarWidth={72}
            avatarHeight={72}
            attendees={attendees}
          />
          <LocalVideo nameplate="Me" />
        </VideosSideBar>
      </ContentShareGrid>
    )
  }

  return (
    <MeetingGrid ref={setMeetingGridRef} tileSize={tileSize}>
      <RemoteVideos
        avatarWidth={128}
        avatarHeight={128}
        attendees={attendees}
      />
      <Draggable>
        <StyledLocalVideo nameplate="Me" />
      </Draggable>
    </MeetingGrid>
  )
}
