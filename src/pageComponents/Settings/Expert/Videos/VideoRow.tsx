import { FC, useState } from 'react'
import Image from 'next/image'
import { DateTime } from 'luxon'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import { useTranslation } from 'next-i18next'

import { Grid } from 'components/Grid'
import { Video } from 'interfaces/Video'
import {
  getVideoRestrictionsLabel,
  getVideoStatusLabel,
  getVideoVisibilityLabel,
} from 'utils/i18n/getExpertVideoLabels'
import {
  VideoActions,
  VideoDetailsMainTitle,
  VideoTableCell,
  VideoTableRow,
  VideoDetailsInfo,
  VideoDetailsTitle,
} from 'pageComponents/Settings/Expert/Videos/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { getVideoThumbnailUrl } from 'utils/videos/getVideoThumbnailUrl'
import { downloadVideo } from 'utils/videos/downloadVideo'

interface VideoRowProps {
  video: Video
  onDelete: (video: Video) => unknown
  onEdit: (video: Video) => unknown
}

export const VideoRow: FC<React.PropsWithChildren<VideoRowProps>> = ({
  video,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertVideos)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeOptionsMenu = () => {
    setAnchorEl(null)
  }
  const formattedDate = DateTime.fromISO(video.file.createdAt).toLocaleString(
    DateTime.DATE_MED
  )
  const statusLabel = getVideoStatusLabel(t, video.status)
  const restrictionsLabel = getVideoRestrictionsLabel(t, video)
  const visibilityLabel = getVideoVisibilityLabel(t, video.visibility)

  const handleDeletion = () => {
    onDelete(video)
    closeOptionsMenu()
  }

  const handleDownload = () => {
    closeOptionsMenu()
    downloadVideo(video)
  }

  const handleEdit = () => {
    onEdit(video)
    closeOptionsMenu()
  }

  return (
    <VideoTableRow key={video.id}>
      <TableCell>
        <Grid container justifyContent="left">
          <Box>
            <Image
              width="120"
              height="80"
              src={getVideoThumbnailUrl(video)}
              alt={video.title}
            />
          </Box>
        </Grid>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="flex-start">
          <VideoActions>
            <IconButton onClick={handleEdit}>
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={handleClick}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={closeOptionsMenu}>
              <MenuItem sx={{ gap: 1 }} onClick={() => handleDownload()}>
                <DownloadIcon />
                {t('videoDetailsDownloadIcon')}
              </MenuItem>
              <MenuItem sx={{ gap: 1 }} onClick={handleDeletion}>
                <DeleteIcon />
                {t('videoDetailsDeleteIcon')}
              </MenuItem>
            </Menu>
          </VideoActions>
          <VideoDetailsMainTitle>
            <VideoDetailsTitle>{video.title}</VideoDetailsTitle>
            <VideoDetailsInfo>{video.description}</VideoDetailsInfo>
          </VideoDetailsMainTitle>
        </Box>
      </TableCell>

      <VideoTableCell>
        <VideoDetailsTitle>{visibilityLabel}</VideoDetailsTitle>
      </VideoTableCell>
      <VideoTableCell>
        <VideoDetailsTitle>{restrictionsLabel}</VideoDetailsTitle>
      </VideoTableCell>
      <VideoTableCell>
        <VideoDetailsTitle>{formattedDate}</VideoDetailsTitle>
        <VideoDetailsInfo>{statusLabel}</VideoDetailsInfo>
      </VideoTableCell>
      <VideoTableCell>
        <VideoDetailsTitle>1M</VideoDetailsTitle>
      </VideoTableCell>
      <VideoTableCell>
        <VideoDetailsTitle>500K</VideoDetailsTitle>
      </VideoTableCell>
      <VideoTableCell>
        <VideoDetailsTitle>800K</VideoDetailsTitle>
      </VideoTableCell>
    </VideoTableRow>
  )
}
