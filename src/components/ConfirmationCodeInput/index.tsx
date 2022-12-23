import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input'
import TextField from '@mui/material/TextField'
import { FC, useEffect, useRef } from 'react'
import { usePrevious } from 'react-use'

import {
  AuthCodeControl,
  AuthCodeSectionMobile,
  ContentSection,
} from 'components/ConfirmationCodeInput/styles'
import { FormError } from 'components/Form/Error'

export interface ConfirmationCodeInputProps {
  value: string
  onChange: (code: string) => void
  error?: string
  placeholder?: string
  className?: string
}

export const ConfirmationCodeInput: FC<ConfirmationCodeInputProps> = ({
  className,
  value,
  onChange,
  error,
  placeholder,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const previousValue = usePrevious(value)
  const authInputRef = useRef<AuthCodeRef>(null)
  useEffect(() => {
    if (authInputRef.current) {
      if (previousValue && !value) {
        authInputRef.current.clear()
      }
    }
  }, [previousValue, value])

  return (
    <ContentSection className={className}>
      {!isMobile && (
        <AuthCodeControl>
          <AuthCode
            ref={authInputRef}
            allowedCharacters="numeric"
            onChange={onChange}
          />
        </AuthCodeControl>
      )}
      {isMobile && (
        <AuthCodeSectionMobile>
          <TextField
            fullWidth
            inputProps={{
              inputMode: 'numeric',
              pattern: '^[0-9]{1,6}$',
              maxLength: 6,
            }}
            variant="outlined"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {error && <FormError>{error}</FormError>}
        </AuthCodeSectionMobile>
      )}
    </ContentSection>
  )
}
