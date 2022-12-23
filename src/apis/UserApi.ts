import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { User, UserSettings, UserStatus } from 'interfaces/User'
import { Config } from 'utils/config'
import { Expert } from 'interfaces/Expert'
import { SessionStatus } from 'interfaces/Session'

const API_URL = Config.getString('API_URL')

interface PartialUserData extends Omit<Partial<User>, 'settings'> {
  settings: Partial<UserSettings>
}

export interface CreateUserRequest {
  profilePictureImage?: File
  userData: Partial<PartialUserData>
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  otp?: string
}

export type UserStatusUpdateRequest = Pick<User, 'status'>

export type SessionByStatus = Record<SessionStatus, number>

class UserApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/users')
  }

  async getCurrent() {
    return super.httpGet<User>('/me')
  }

  async getDetails() {
    return super.httpGet<{ user: User; expert: Expert | null }>('/details')
  }

  async getExpert(userId: string) {
    return super.httpGet<Expert>(`/${userId}/expert`)
  }

  async getSessionCounts(userId: string) {
    return super.httpGet<SessionByStatus>(`/${userId}/session-counts`)
  }

  async update(userId: string, updateData: UpdateUserRequest) {
    const formData = new FormData()
    const { profilePictureImage, userData, otp } = updateData
    if (profilePictureImage) {
      formData.append('profilePicture', profilePictureImage)
    }

    if (userData) {
      formData.append('userData', JSON.stringify(userData))
    }

    if (otp) {
      formData.append('otp', otp)
    }

    return super.httpPatch<User>(`/${userId}`, {
      body: formData,
    })
  }

  async updateStatus(userId: string, status: UserStatus) {
    const body: UserStatusUpdateRequest = {
      status,
    }

    return super.httpPatch<User>(`/${userId}/status`, {
      body: JSON.stringify(body),
    })
  }
}

export const UserApi = new UserApiClass()
