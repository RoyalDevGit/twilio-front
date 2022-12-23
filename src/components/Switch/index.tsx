import styled from '@emotion/styled'
import MuiSwitch, { SwitchProps } from '@mui/material/Switch'

export const Switch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))`
  width: 42px;
  height: 26px;
  padding: 0px;
`
