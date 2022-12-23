import { Model, ModelRef } from 'interfaces/Model'
import { User } from 'interfaces/User'

export enum FileTrackerStatus {
  Null = 'null',
  Persisting = 'persisting',
  Persisted = 'persisted',
  Inactive = 'inactive',
  Deleting = 'deleting',
  Deleted = 'deleted',
}

export interface FileTracker extends Model {
  originalFileName?: string
  fileKey: string
  extension?: string
  mimeType?: string
  bucket: string
  size?: number
  status: FileTrackerStatus
  createdBy: ModelRef<User>
  createdAt: string
  deactivatedAt?: string
}
