import { FC, SVGProps } from 'react'

import CartIconLight from 'icons/Cart/svg/cart-light.svg'
import CartIconDark from 'icons/Cart/svg/cart-dark.svg'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export const CartIcon: FC<SVGProps<SVGElement>> = (props) => {
  const isDarkMode = usePrefersDarkMode()
  if (isDarkMode) {
    return <CartIconDark {...props} />
  }
  return <CartIconLight {...props} />
}
