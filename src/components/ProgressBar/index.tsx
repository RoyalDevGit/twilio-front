import { FC } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

import {
  ProgressBarBox,
  ProgressBarContainer,
  ProgressBarLabel,
} from 'components/ProgressBar/styles'

export interface ProgressBarProps {
  value: number
}

export const ProgressBar: FC<ProgressBarProps> = ({ value }) => (
  <ProgressBarContainer>
    <ProgressBarBox>
      <LinearProgress variant="determinate" value={value} />
    </ProgressBarBox>
    <Box>
      <ProgressBarLabel variant="body2" color="text.secondary">
        {value}%
      </ProgressBarLabel>
    </Box>
  </ProgressBarContainer>
)
