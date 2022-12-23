import { Breakpoint } from '@mui/material/styles'

export interface DialogStep<StepKey> {
  key: StepKey
  component: JSX.Element
  componentWidth: Breakpoint
  previous?: StepKey
  next?: StepKey
  onContinue?: () => Promise<boolean>
}
