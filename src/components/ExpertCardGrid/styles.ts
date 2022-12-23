import styled from '@emotion/styled'

import { BigExpertCard } from 'components/ExpertCardBig/styles'
import { SmallExpertCard } from 'components/ExpertCardSmall/styles'
import { Grid } from 'components/Grid'

export const CustomExpertsGrid = styled(Grid)`
  ${BigExpertCard}, ${SmallExpertCard} {
    min-width: auto;
  }
`
