import { NextPage } from 'next'
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useTranslation } from 'next-i18next'
import { useUpdateEffect } from 'react-use'

import { useRouter } from 'hooks/useRouter'
import {
  ExpertVideosBody,
  ExpertVideosToolbar,
} from 'pageComponents/Settings/Expert/Videos/styles'
import { Video, VideoStatus } from 'interfaces/Video'
import { ExpertProfilePage } from 'pageComponents/Settings/Expert'
import { VideoEditorDialog } from 'components/Dialogs/VideoEditorDialog'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { VideoRow } from 'pageComponents/Settings/Expert/Videos/VideoRow'
import { VideoDeletionConfirmationDialog } from 'components/Dialogs/VideoDeletionConfirmationDialog'
import { useExpertAsserted } from 'hooks/useExpert'
import { VideoApi } from 'apis/VideoApi'

export interface ExpertVideosPageProps {
  initialVideos: Video[]
}

export const ExpertVideosPage: NextPage<ExpertVideosPageProps> = ({
  initialVideos,
}) => {
  const router = useRouter()
  const { t } = useTranslation(LocaleNamespace.ExpertVideos)
  const expert = useExpertAsserted()

  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [videoToBeDeleted, setVideoToBeDeleted] = useState<Video | undefined>()
  const [refresh, setRefresh] = useState(false)
  const [videoEditorIsOpen, setVideoEditorIsOpen] = useState(false)
  const [videoToBeEdited, setVideoToBeEdited] = useState<Video | undefined>()

  const openVideoEditor = (video?: Video) => {
    setVideoToBeEdited(video)
    setVideoEditorIsOpen(true)
  }

  const closeVideoEditor = () => {
    setVideoEditorIsOpen(false)
    setVideoToBeEdited(undefined)
  }

  const openDeletionConfirmation = (video: Video) => {
    setVideoToBeDeleted(video)
  }
  const closeDeletionConfirmation = () => {
    setVideoToBeDeleted(undefined)
  }

  const handleEdit = (video: Video) => {
    if (video.status !== VideoStatus.Published) {
      openVideoEditor(video)
    } else {
      router.push(`/expert/videos/${video.id}`)
    }
  }

  const handleVideoUpload = (video: Video) => {
    setVideoToBeEdited(video)
    setRefresh(true)
  }

  const handleVideoSave = (_video: Video) => {
    setRefresh(true)
  }

  const handleVideoPublish = (_video: Video) => {
    setRefresh(true)
  }

  const handleDeletion = () => {
    setRefresh(true)
  }

  useUpdateEffect(() => {
    if (!refresh) {
      return
    }
    setRefresh(false)
    const refreshVideos = async () => {
      const videosResult = await VideoApi.query({
        limit: 100,
        page: 1,
        expertId: expert.id,
      })

      if (videosResult.ok()) {
        const videoQueryResult = await videosResult.getData()
        setVideos(videoQueryResult.items)
      }
    }
    refreshVideos()
  }, [refresh])

  return (
    <ExpertProfilePage>
      <ExpertVideosBody>
        <ExpertVideosToolbar>
          <Button onClick={() => openVideoEditor()} variant="contained">
            {t('uploadButton')}
          </Button>
        </ExpertVideosToolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('videoTableLabel')}</TableCell>
              <TableCell>{t('videoTitleTableLabel')}</TableCell>
              <TableCell>{t('visibilityTableLabel')}</TableCell>
              <TableCell>{t('restrictionsTableLabel')}</TableCell>
              <TableCell>{t('dateTableLabel')}</TableCell>
              <TableCell>{t('viewsTableLabel')}</TableCell>
              <TableCell>{t('commentsTableLabel')}</TableCell>
              <TableCell>{t('likesTableLabel')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <VideoRow
                key={video.id}
                video={video}
                onEdit={handleEdit}
                onDelete={openDeletionConfirmation}
              />
            ))}
          </TableBody>
        </Table>
      </ExpertVideosBody>
      <VideoEditorDialog
        expert={expert}
        open={videoEditorIsOpen}
        video={videoToBeEdited}
        maxWidth="laptop"
        fullWidth
        onUpload={handleVideoUpload}
        onSave={handleVideoSave}
        onPublish={handleVideoPublish}
        onClose={closeVideoEditor}
      />

      <VideoDeletionConfirmationDialog
        open={!!videoToBeDeleted}
        video={videoToBeDeleted}
        onClose={closeDeletionConfirmation}
        onDelete={handleDeletion}
      />
    </ExpertProfilePage>
  )
}
