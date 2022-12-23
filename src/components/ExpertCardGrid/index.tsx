import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { FC } from 'react'

import { ExpertCardBig } from 'components/ExpertCardBig'
import { Expert } from 'interfaces/Expert'
import { Grid, GridProps } from 'components/Grid'
import { ExpertCardSmall } from 'components/ExpertCardSmall'
import { CustomExpertsGrid } from 'components/ExpertCardGrid/styles'

export interface ExpertCardGridProps extends GridProps {
  experts: Expert[]
  hideFavoriteIcon?: boolean
  onUnfavorite?: () => void
}

export const ExpertCardGrid: FC<ExpertCardGridProps> = ({
  experts,
  hideFavoriteIcon,
  onUnfavorite,
  ...gridProps
}) => {
  const theme = useTheme()
  const isMini = useMediaQuery(theme.breakpoints.only('mobileL'))

  const expertUnfavorited = () => {
    if (onUnfavorite) {
      onUnfavorite()
    }
  }

  return (
    <CustomExpertsGrid container spacing={2} {...gridProps}>
      {experts.map((expert) => (
        <Grid
          item
          mobileS={12}
          mobileL={6}
          tablet={4}
          laptop={3}
          laptopL={2.4}
          fourK={1.5}
          key={expert.id}
        >
          {isMini ? (
            <ExpertCardSmall
              expert={expert}
              key={expert.id}
              id={`browse-small-expert-card-${expert.id}`}
              onUnfavorite={expertUnfavorited}
            />
          ) : (
            <ExpertCardBig
              expert={expert}
              key={expert.id}
              id={`browse-big-expert-card-${expert.id}`}
              hideFavoriteIcon={hideFavoriteIcon}
              onUnfavorite={expertUnfavorited}
            />
          )}
        </Grid>
      ))}
    </CustomExpertsGrid>
  )
}
