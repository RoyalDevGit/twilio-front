import { FC } from 'react'

import { VideoThumbnail } from 'interfaces/Video'
import {
  ThumbnailPicker,
  ThumbnailOption,
  ThumbnailImage,
} from 'components/VideoThumbnailPicker/styles'
import { getVideoAssetUrl } from 'utils/videos/getVideoAssetUrl'

export interface VideoThumbnailPickerProps {
  value: string | undefined | null
  disabled?: boolean
  thumbnails: VideoThumbnail[]
  onChange: (thumbnail: VideoThumbnail) => unknown
}

export const VideoThumbnailPicker: FC<
  React.PropsWithChildren<VideoThumbnailPickerProps>
> = ({ value, disabled, thumbnails, onChange: onSelectionChange }) => (
  <ThumbnailPicker disabled={disabled}>
    {thumbnails.map((thumb) => (
      <ThumbnailOption
        key={thumb.id}
        selected={thumb.id === value}
        onClick={() => !disabled && onSelectionChange(thumb)}
      >
        <ThumbnailImage src={getVideoAssetUrl(thumb?.file?.fileKey)} />
      </ThumbnailOption>
    ))}
  </ThumbnailPicker>
)
