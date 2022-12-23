import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Pagination from '@mui/material/Pagination'

import { useRouter } from 'hooks/useRouter'
import { ExpertPage } from 'pageComponents/ExpertProfile'
import { VideoThumbnailList } from 'components/VideoThumbnailList'
import { QueryVideosResponse, VideoApi } from 'apis/VideoApi'
import { ExpertChildrenPageProps } from 'interfaces/Expert'

export interface ExpertVideoPageProps extends ExpertChildrenPageProps {
  videos: QueryVideosResponse
}

export const ExpertVideoPage: NextPage<ExpertVideoPageProps> = (props) => {
  const { initialExpert, videos } = props
  const router = useRouter()
  const pageQueryParam =
    typeof router.query.page === 'string' ? parseInt(router.query.page) : 1
  const [currentPage, setCurrentPage] = useState(pageQueryParam)
  const [expert, setExpert] = useState(initialExpert)
  const [videoPages, setVideoPages] = useState<
    Record<number, QueryVideosResponse>
  >({ [currentPage]: videos })
  const currentPageData = videoPages[currentPage]

  async function handleChangePage(_e: ChangeEvent<unknown>, newPage: number) {
    if (!videoPages[newPage]) {
      const videosResult = await VideoApi.query({
        expertId: initialExpert.id,
        limit: 10,
        page: newPage,
      })
      const data = await videosResult.getData()
      setVideoPages((prev) => ({
        ...prev,
        [newPage]: data,
      }))
    }

    if (currentPage !== newPage) {
      setCurrentPage(newPage)
      router.replace(
        {
          pathname: `/experts/${initialExpert.id}/videos`,
          query: newPage === 1 ? {} : { page: newPage },
        },
        undefined,
        { shallow: true, scroll: true }
      )
    }
  }

  return (
    <ExpertPage expert={expert} updateExpert={(updated) => setExpert(updated)}>
      <VideoThumbnailList videos={currentPageData.items} />
      <Pagination
        page={currentPage}
        count={videos.totalPages}
        onChange={handleChangePage}
      />
    </ExpertPage>
  )
}
