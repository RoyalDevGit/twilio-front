import { Model } from 'interfaces/Model'
import { User } from 'interfaces/User'

export enum CommentType {
  Comment = 'comment',
  Review = 'review',
}

export enum CommentEntityType {
  Video = 'video',
  Expert = 'expert',
  Consumer = 'consumer',
  Session = 'session',
  Comment = 'comment',
}

export enum CommentLikeStatusValue {
  Liked = 'liked',
  Disliked = 'disliked',
}

export interface AverageRating {
  rating: number
  count: number
}
export interface AverageRatings
  extends Partial<Record<CommentEntityType, AverageRating>> {
  overall?: AverageRating
}
export interface Ratings extends Partial<Record<CommentEntityType, number>> {
  overall?: number
}

export interface Comment extends Model {
  commentType: CommentType
  entityType: CommentEntityType
  entityId: string
  subject?: string
  content?: string
  edited: boolean
  ratings?: Ratings
  likeCount: number
  dislikeCount: number
  totalReplies: number
  pinned: boolean
  createdBy: User
  createdAt: string
  likeStatus: CommentLikeStatusValue
}
