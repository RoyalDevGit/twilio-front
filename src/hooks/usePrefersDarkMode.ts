import useMediaQuery from '@mui/material/useMediaQuery'

import { useCurrentUser } from 'hooks/useCurrentUser'
import { ColorSchemePreference } from 'interfaces/User'

interface UsePrefersDarkModeProps {
  inverted?: boolean
}

export const usePrefersDarkMode = ({
  inverted,
}: UsePrefersDarkModeProps = {}) => {
  const user = useCurrentUser()

  let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  if (
    user &&
    user.settings.colorScheme &&
    user.settings.colorScheme !== ColorSchemePreference.System
  ) {
    prefersDarkMode = user.settings.colorScheme === ColorSchemePreference.Dark
  }

  if (inverted) {
    prefersDarkMode = !prefersDarkMode
  }

  return prefersDarkMode
}
