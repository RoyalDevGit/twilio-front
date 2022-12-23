import styled from '@emotion/styled'
import Container from '@mui/material/Container'

export const MyFavoritesVideosContainer = styled(Container)``

export const VideoCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 265px);
  justify-content: center;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    grid-template-columns: repeat(4, 265px);
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: repeat(3, 265px);
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: repeat(2, 265px);
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: repeat(1, 265px);
  }
`
