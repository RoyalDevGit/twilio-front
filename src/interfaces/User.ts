import { Category } from 'interfaces/Category'
import { AverageRatings } from 'interfaces/Comment'
import { FileTracker } from 'interfaces/FileTracker'
import { Language } from 'interfaces/Language'
import { Model, ModelRef } from 'interfaces/Model'
import { PhoneNumber } from 'interfaces/PhoneNumber'

export enum ColorSchemePreference {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export enum UserRole {
  Consumer = 'consumer',
  Expert = 'expert',
}

export interface UserSettings {
  colorScheme?: ColorSchemePreference
  language?: ModelRef<Language>
  timeZone: string
}

export enum TwoFactorAuthMethod {
  SMS = 'sms',
  Authenticator = 'authenticator',
}

export interface TwoFactorAuthSettings {
  methods?: TwoFactorAuthMethod[]
  preferred?: TwoFactorAuthMethod
  authenticationSecret?: string
}

export enum UserStatus {
  Unavailable = 'unavailable',
  Available = 'available',
  InSession = 'in_session',
  Unknown = 'unknown',
}

export interface User extends Model {
  roles: UserRole[]
  firstName: string
  lastName: string
  emailAddress: string
  emailVerificationStartDate?: string
  mobilePhoneNumber?: PhoneNumber | null
  location?: string
  password?: string
  emailVerified: boolean
  profilePicture?: FileTracker | null
  createdBy?: ModelRef<User>
  joined: string
  settings: UserSettings
  areasOfInterest?: ModelRef<Category>[]
  averageRatings?: AverageRatings
  twoFactorAuthSettings?: TwoFactorAuthSettings
  status: UserStatus
  chimeAppInstanceUserArn?: string
  lastSeen: string
  isGuest: boolean
}
