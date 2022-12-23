export enum ApiErrorCode {
  Unknown = 'UNKNOWN',
  NotAuthorized = 'NOT_AUTHORIZED',
  NotFound = 'NOT_FOUND',
  IncorrectCredentials = 'INCORRECT_CREDENTIALS',
  ValidationFailed = 'VALIDATION_FAILED',
  Require2FA = 'REQUIRE_2FA',
  Incorrect2FA = 'INCORRECT_2FA',
  Expired = 'EXPIRED',
  PreviouslyCompleted = 'PREVIOUSLY_COMPLETED',
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  OAuthCodeExpired = 'CODE_EXPIRED',
  OAuthCodeAlreadyUsed = 'CODE_ALREADY_USED',
  OAuthCodeUnknown = 'OAUTH_UNKNOWN',
  InvalidPassword = 'INVALID_PASSWORD',
}
export interface ApiErrorData<T = unknown> {
  message: string
  type: string
  code: ApiErrorCode
  data?: T
}

export class ApiError<T = unknown> extends Error implements ApiErrorData<T> {
  message: string
  type: string
  code: ApiErrorCode
  data?: T
  constructor(error: ApiErrorData<T>) {
    super(error.message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = 'ApiError'
    this.message = error.message
    this.type = error.type
    this.code = error.code
    this.data = error.data
  }
}
