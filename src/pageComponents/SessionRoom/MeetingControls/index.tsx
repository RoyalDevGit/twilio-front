import { FC } from 'react'

import { Session } from 'interfaces/Session'
import { MeetingControlsContainer } from 'pageComponents/SessionRoom/MeetingControls/styles'
import { VideoControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/VideoControl'
import { MuteControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/MuteControl'
import { ScreenShareControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/ScreenShareControl'
import { RecordingControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/RecordingControl'
import { BackgroundBlurControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/BackgroundBlurControl'
import { NoiseCancellationControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/NoiseCancellationControl'
import { EndSessionControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/EndSessionControl'
import { KebabMenuControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/KebabMenuControl'
import { ChatControl } from 'pageComponents/SessionRoom/MeetingControls/Controls/ChatControl'

export interface MeetingControlsProps {
  session: Session
  isChatOpen: boolean
  onChatToggle: () => unknown
  onChatOpen?: () => unknown
  onChatClose?: () => unknown
  onEnd: () => unknown
}

export const MeetingControls: FC<MeetingControlsProps> = ({
  session,
  isChatOpen,
  onChatToggle,
  onChatClose,
  onChatOpen,
  onEnd,
}) => (
  <MeetingControlsContainer>
    <MuteControl />
    <VideoControl />
    <ScreenShareControl />
    <RecordingControl session={session} />
    <BackgroundBlurControl />
    <NoiseCancellationControl />
    <KebabMenuControl />
    <ChatControl
      session={session}
      onOpen={onChatOpen}
      onClose={onChatClose}
      isOpen={isChatOpen}
      onClick={onChatToggle}
    />
    <EndSessionControl onEnd={onEnd} />
  </MeetingControlsContainer>
)
