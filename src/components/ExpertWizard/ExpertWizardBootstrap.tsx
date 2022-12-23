import { FC, lazy, LazyExoticComponent, Suspense, useState } from 'react'
import { useMount } from 'react-use'

import { useCurrentUser } from 'hooks/useCurrentUser'
import { hasExpertRole } from 'utils/user/hasExpertRole'
import { useExpert } from 'hooks/useExpert'
import { ExpertIntroWizardStatus } from 'interfaces/Expert'
import { ExpertWizardProps } from 'components/ExpertWizard'

export const mobileNavigationBreakpoint = 'tablet'
export const collapsibleDrawerBreakpoint = 'laptopL'

export const ExpertWizardBootstrap: FC = () => {
  const user = useCurrentUser()
  const expertProfile = useExpert()
  const [dialogIsOpen, setDialogIsOpen] = useState(true)
  const [ExpertWizard, setExpertWizard] = useState<
    LazyExoticComponent<FC<ExpertWizardProps>> | undefined
  >()

  const onDismiss = () => {
    setDialogIsOpen(false)
  }

  useMount(() => {
    const useHasExpertRole = user && hasExpertRole(user)
    let expertDismissedWizard = false
    let expertCompletedWizard = false
    if (expertProfile) {
      expertDismissedWizard =
        expertProfile.introWizardStatus === ExpertIntroWizardStatus.Dismissed
      expertCompletedWizard =
        expertProfile.introWizardStatus === ExpertIntroWizardStatus.Completed
    }

    if (useHasExpertRole && !expertDismissedWizard && !expertCompletedWizard) {
      const ExpertWizard = lazy(() =>
        import('../ExpertWizard').then(({ ExpertWizard: WelcomeWizard }) => ({
          default: WelcomeWizard,
        }))
      )
      setExpertWizard(ExpertWizard)
    }
  })

  return (
    <>
      {ExpertWizard && (
        <Suspense>
          <ExpertWizard open={dialogIsOpen} onClose={onDismiss} />
        </Suspense>
      )}
    </>
  )
}
