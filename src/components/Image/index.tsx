import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { FC } from 'react'

import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'

export type ImageProps = NextImageProps

export const Image: FC<ImageProps> = (props) => (
  <NextImage
    {...props}
    unoptimized={props.unoptimized ?? true}
    placeholder="blur"
    blurDataURL={`${getStorageBucketFileUrl('image-blur-placeholder.png')}`}
    alt=""
  />
)
