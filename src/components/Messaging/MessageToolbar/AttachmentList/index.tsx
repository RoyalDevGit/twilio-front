import { FC, useEffect, useState } from 'react'
// eslint-disable-next-line import/extensions, import/no-unresolved
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

import { Attachment } from 'components/Attachment'
import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import {
  AttachmentListContainer,
  FileContainer,
  ImagePreview,
} from 'components/Messaging/MessageToolbar/AttachmentList/styles'
import { SmallCloseButton } from 'components/CloseButton/Small'
import {
  BackButton,
  ForwardButton,
} from 'components/Messaging/MessageToolbar/AttachmentList/ScrollableButtons'

interface AttachmentListProps {
  attachments: File[]
  attachmentWidth: number
  attachmentHeight: number
  imageWidth: number
  imageHeight: number
  onRemovedFile: (n: number) => void
}

export const AttachmentList: FC<AttachmentListProps> = ({
  attachments,
  attachmentHeight,
  attachmentWidth,
  imageWidth,
  imageHeight,
  onRemovedFile,
}) => {
  const [filePreviews, setFilePreviews] = useState<
    (EmotionJSX.Element | undefined)[]
  >([])
  const [imagePreviews, setImagePreviews] = useState<EmotionJSX.Element[]>([])

  const removeImage = (index: number) => {
    setImagePreviews((prevPreview) =>
      prevPreview.filter((i) => i.key !== index.toString())
    )
    onRemovedFile(index)
  }
  const removeAttachment = (index: number) => {
    setFilePreviews((prevPreview) =>
      prevPreview.filter((f) => f?.key !== index.toString())
    )
    onRemovedFile(index)
  }

  useEffect(() => {
    const files = attachments.map((a, i) => {
      if (a.type.includes('image')) {
        const imageReader = new FileReader()
        let imageURL = ''
        imageReader.onload = (e) => {
          imageURL = e.target?.result?.toString() ?? ''
          const imagePreview = (
            <FileContainer key={i} width={imageWidth} height={imageHeight}>
              <SmallCloseButton onClickClose={() => removeImage(i)} />
              <ImagePreview
                key={imageURL}
                src={imageURL}
                width={imageWidth}
                height={imageHeight}
                layout="fixed"
                alt=""
              />
            </FileContainer>
          )
          if (
            imagePreviews &&
            !imagePreviews.find((img) => img.key === i.toString())
          ) {
            setImagePreviews([...imagePreviews, imagePreview])
          }
        }
        imageReader.readAsDataURL(a)
      } else {
        return (
          <FileContainer
            key={i}
            width={attachmentWidth}
            height={attachmentHeight}
          >
            <SmallCloseButton onClickClose={() => removeAttachment(i)} />
            <Attachment
              fileName={a.name}
              width={attachmentWidth}
              height={attachmentHeight}
            />
          </FileContainer>
        )
      }
    })
    if (files) {
      setFilePreviews(files.filter((f) => f !== undefined))
    }
  }, [attachments])

  return (
    <AttachmentListContainer>
      <HorizontalScrollableContainer
        BackButton={BackButton}
        ForwardButton={ForwardButton}
      >
        {[...filePreviews, ...imagePreviews]}
      </HorizontalScrollableContainer>
    </AttachmentListContainer>
  )
}
