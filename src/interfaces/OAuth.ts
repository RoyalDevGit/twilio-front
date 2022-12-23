import { TokenResponse } from 'interfaces/TokenResponse'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { ApiError } from 'utils/error/ApiError'

export enum OAuthProvider {
  Facebook = 'facebook',
  Google = 'google',
  Microsoft = 'microsoft',
  Apple = 'apple',
}

export enum OAuthType {
  SignUp = 'signup',
  Login = 'login',
}

export enum OAuthDevice {
  Mobile = 'mobile',
  Desktop = 'desktop',
}

export interface OAuth_2FA_RequestBody {
  twoFactorAuthMethod: TwoFactorAuthMethod | undefined
  otp: string | undefined
}

export interface OAuthCallbackResponse {
  token?: TokenResponse
  error?: ApiError
  method?: TwoFactorAuthMethod
}
