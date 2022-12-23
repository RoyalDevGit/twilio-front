import InputAdornment from '@mui/material/InputAdornment'
import { ChangeEventHandler, FC, forwardRef, useCallback } from 'react'
import { IMaskInput } from 'react-imask'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

import { PhoneNumber } from 'interfaces/PhoneNumber'
import {
  CountryCodeInput,
  MainSection,
} from 'components/PhoneNumberInput/styles'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const PhoneNumberMaskInput = forwardRef<HTMLElement, CustomProps>(
  function PhoneNumberMaskInput(props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        unmask
        definitions={{
          '#': /[1-9]/,
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputRef={ref}
        onAccept={(value: unknown) => {
          onChange({ target: { name: props.name, value: value as string } })
        }}
        overwrite
      />
    )
  }
)

export interface PhoneNumberInputProps {
  value?: PhoneNumber | null
  onChange?: (phoneNumber: PhoneNumber) => unknown
  error?: boolean
}

export const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const handleOnChange = (
    countryCode: string | undefined,
    number: string | undefined
  ) => {
    if (!onChange) {
      return
    }
    const newPhoneNumber: PhoneNumber = {
      countryCode: countryCode || '',
      number: number || '',
    }
    onChange(newPhoneNumber)
  }
  const handleCountryCodeChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (e) => {
      const newCountryCode = e.target.value
      handleOnChange(newCountryCode, value?.number)
    },
    [value]
  )

  const handleNumberChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (e) => {
      const newNumber = e.target.value
      handleOnChange(value?.countryCode, newNumber)
    },
    [value]
  )

  return (
    <MainSection data-testid="phone-number-input">
      <CountryCodeInput
        error={error}
        type="text"
        variant="outlined"
        value={value?.countryCode}
        onChange={handleCountryCodeChange}
        inputProps={{
          inputMode: 'numeric',
          maxLength: 3,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">+</InputAdornment>,
        }}
        id="country-code-input"
      />
      <FormControl variant="outlined">
        <OutlinedInput
          error={error}
          placeholder="(###) ###-####"
          value={value?.number || ''}
          onChange={handleNumberChange}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          inputComponent={PhoneNumberMaskInput}
          id="number-input"
        />
      </FormControl>
    </MainSection>
  )
}
