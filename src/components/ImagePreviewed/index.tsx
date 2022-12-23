import { FC, useState } from 'react'

import { ImageProps } from 'components/Image'
import { ImagePreview, PreviewSkeleton } from 'components/ImagePreviewed/styles'

export const ImagePreviewed: FC<ImageProps> = (props) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const image = (
    <ImagePreview {...props} onLoadingComplete={() => setHasLoaded(true)} />
  )
  return !hasLoaded ? (
    <PreviewSkeleton variant="rounded">{image}</PreviewSkeleton>
  ) : (
    image
  )
}
