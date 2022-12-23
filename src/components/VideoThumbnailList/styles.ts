import styled from '@emotion/styled'

const maxThumbnailWidth = '250px'

export const VideoListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max-content, ${maxThumbnailWidth})
  );
  gap: ${({ theme }) => theme.spacing(3)};
`
export const VideoThumbnail = styled.div`
  max-width: ${maxThumbnailWidth};
`

export const ThumbnailCover = styled.div`
  position: relative;
`
export const ThumbnailImage = styled.img`
  width: 100%;
`
export const ThumbnailBody = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  padding-right: ${({ theme }) => theme.spacing(0)};
`
export const ThumbnailDetails = styled.div``
export const VideoName = styled.div`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`
export const DateSection = styled.div`
  margin-right: ${({ theme }) => theme.spacing(0.5)};
`
export const ActionSection = styled.div`
  flex: 1 1 auto;
  text-align: right;
`
