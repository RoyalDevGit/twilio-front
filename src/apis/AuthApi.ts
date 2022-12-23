import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { TwoFactorAuthMethod, User, UserRole } from 'interfaces/User'
import { AuthenticatorInfo } from 'interfaces/AuthenticatorInfo'
import { PhoneNumber } from 'interfaces/PhoneNumber'
import { OAuth_2FA_RequestBody } from 'interfaces/OAuth'

export interface LoginCredentials {
  emailAddress: string
  password: string
  twoFactorAuthMethod?: TwoFactorAuthMethod
  otp?: string
  guestUserId?: string
}

export interface SignupRequest {
  firstName: string
  lastName: string
  emailAddress: string
  password: string
  roles: UserRole[]
  timeZone: string
  guestUserId?: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
  twoFactorAuthMethod?: TwoFactorAuthMethod
  otp?: string
}
const API_URL = Config.getString('API_URL')

class AuthApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = '/api/auth'
  }

  login(credentials: LoginCredentials) {
    return super.httpPost<User>('/login', {
      body: JSON.stringify(credentials),
    })
  }

  sendResetPasswordLink(emailAddress: string) {
    return super.httpPost('/send-password-reset-link', {
      prefix: urlJoin(API_URL, '/auth'),
      body: JSON.stringify({ emailAddress }),
    })
  }

  async resetPassword(password: string, token: string) {
    const formData = new FormData()
    formData.append('password', password)
    formData.append('token', token)
    return super.httpPut('/reset-password', {
      body: formData,
    })
  }

  async logout() {
    return super.httpPost('/logout')
  }

  async signup(signupRequest: SignupRequest) {
    return super.httpPost<User>('/signup', {
      body: JSON.stringify(signupRequest),
    })
  }

  getAuthenticatorAppInfo() {
    return super.httpGet<AuthenticatorInfo>('/authenticator-info', {
      prefix: urlJoin(API_URL, '/auth'),
    })
  }

  sendSmsAuthCode(phoneNumber?: PhoneNumber) {
    return super.httpPost('/send-sms-auth-code', {
      prefix: urlJoin(API_URL, '/auth'),
      body: JSON.stringify({ phoneNumber }),
    })
  }

  async changePassword(changeRequest: ChangePasswordRequest) {
    return await super.httpPut('change-password', {
      body: JSON.stringify(changeRequest),
      prefix: urlJoin(API_URL, '/auth'),
    })
  }

  oAuthSignIn(route: string) {
    return super.httpGet<User>(route, {
      prefix: '/',
    })
  }

  oAuth2FA(route: string, body: OAuth_2FA_RequestBody) {
    return super.httpPost<User>(route, {
      prefix: '/',
      body: JSON.stringify(body),
    })
  }
}

export const AuthApi = new AuthApiClass()
