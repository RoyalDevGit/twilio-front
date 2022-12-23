import { FC, ReactNode } from 'react'
import { useHover } from 'react-use'

import { FavoriteToggleButton } from 'pageComponents/ExpertProfile/FavoriteButton/styles'
import { FavoriteButtonHeartIconEmpty } from 'icons/FavoriteButtonHeart/Empty'
import { FavoriteButtonHeartIconFilled } from 'icons/FavoriteButtonHeart/Filled'
import { FavoriteButtonHeartIconHovered } from 'icons/FavoriteButtonHeart/Hovered'

export interface FavoriteButtonProps {
  isFavorite: boolean
  className?: string
  children?: ReactNode
  onClick: () => unknown
}

export const FavoriteButton: FC<
  React.PropsWithChildren<FavoriteButtonProps>
> = ({ isFavorite, className, children, onClick }) => {
  const element = (hovered: boolean) => {
    let icon: ReactNode
    if (isFavorite) {
      icon = <FavoriteButtonHeartIconFilled />
    } else {
      if (hovered) {
        icon = <FavoriteButtonHeartIconHovered />
      } else {
        icon = <FavoriteButtonHeartIconEmpty />
      }
    }

    return (
      <FavoriteToggleButton
        isfavorite={isFavorite.toString()}
        className={className}
        onClick={onClick}
        variant="outlined"
        color="primary"
        startIcon={icon}
        data-testid="favorite-button"
      >
        {children}
      </FavoriteToggleButton>
    )
  }

  const [hoverable] = useHover(element)

  return hoverable
}
