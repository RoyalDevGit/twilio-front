import { FC } from 'react'
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox'

import { UncheckedCheckboxIcon } from 'icons/Checkbox/Unchecked'
import { CheckedCheckboxIcon } from 'icons/Checkbox/Checked'

export const Checkbox: FC<React.PropsWithChildren<CheckboxProps>> = (props) => (
  <MuiCheckbox
    icon={<UncheckedCheckboxIcon />}
    checkedIcon={<CheckedCheckboxIcon />}
    {...props}
  />
)
