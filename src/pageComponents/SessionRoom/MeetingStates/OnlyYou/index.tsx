import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import {
  ActionSection,
  CircularProgressSection,
  SessionExpiredContainer,
  SessionExpiredHeader,
} from 'pageComponents/SessionRoom/MeetingStates/OnlyYou/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Button } from 'components/Button'

export const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" {...props} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="caption"
        component="div"
        color="text.secondary"
      >{`:${Math.round(props.value)}`}</Typography>
    </Box>
  </Box>
)

export const SessionOnlyYou: FC = () => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  const [progress, setProgress] = useState(60)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 60 ? 0 : prevProgress + 1))
    }, 800)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleClickRejoin = () => {
    window.location.reload()
  }

  return (
    <SessionExpiredContainer>
      <CircularProgressSection>
        <CircularProgressWithLabel value={progress} />
        <Typography>{t('returningToHomeScreen')}</Typography>
      </CircularProgressSection>

      <SessionExpiredHeader variant="h2">
        {t('sessionNotification')}
      </SessionExpiredHeader>
      <ActionSection>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleClickRejoin}
        >
          {t('rejoin')}
        </Button>
        <Button href="/" variant="outlined" size="large" color="tertiary">
          {t('goBack')}
        </Button>
      </ActionSection>
      <Button size="large" href="/">
        {t('submitFeedback')}
      </Button>
    </SessionExpiredContainer>
  )
}
