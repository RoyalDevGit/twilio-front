import { Category } from 'interfaces/Category'
import { AverageRatings } from 'interfaces/Comment'
import { FileTracker } from 'interfaces/FileTracker'
import { Language } from 'interfaces/Language'
import { Model, ModelRef } from 'interfaces/Model'
import { PhoneNumber } from 'interfaces/PhoneNumber'
import { User } from 'interfaces/User'
import { Video } from 'interfaces/Video'

export enum ExpertIntroWizardStatus {
  NotStarted = 'not_started',
  Completed = 'completed',
  Started = 'started',
  Dismissed = 'dismissed',
}

export interface SocialMediaLinks {
  twitter?: string
  facebook?: string
  linkedIn?: string
  youTube?: string
  instagram?: string
}

export interface Expert extends Model {
  user: User
  mainAreaOfExpertise?: string
  description?: Record<string, string>
  phoneNumber?: PhoneNumber | null
  expertiseCategories?: ModelRef<Category>[]
  location?: string
  languages?: ModelRef<Language>[]
  bannerImage?: FileTracker
  expertSince: string
  verified: boolean
  followerCount: number
  followingCount: number
  hourlyRate?: number
  noticePeriod: number
  averageRatings?: AverageRatings
  introVideo?: ModelRef<Video>
  tags?: string[]
  experiences?: string[]
  educations?: string[]
  totalFavorites: number
  isFavorite: boolean
  socialMediaLinks?: SocialMediaLinks
  introWizardStatus?: ExpertIntroWizardStatus
}

export interface ExpertPageProps {
  expert: Expert
  children: React.ReactNode
  updateExpert: (updatedExpert: Expert) => unknown
}
export interface ExpertChildrenPageProps {
  initialExpert: Expert
}
