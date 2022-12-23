import styled from '@emotion/styled'

import { Image } from 'components/Image'

export const AttachmentsSection = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`
interface AttachmentContainerProps {
  hover?: boolean
}
export const AttachmentContainer = styled.div<AttachmentContainerProps>`
  display: flex;
  cursor: ${({ hover }) => (hover ? 'pointer' : 'default')};
  .MuiIconButton-root {
    visibility: hidden;
  }

  :hover {
    .MuiIconButton-root {
      visibility: visible;
    }
  }
`

export const ImagePreview = styled(Image)`
  border-radius: 4px;
`
