import { FileTracker } from 'interfaces/FileTracker'
import { Model, ModelRef } from 'interfaces/Model'

export interface Language extends Model {
  code: string
  name: string
  invertedName: string
  iconImage?: ModelRef<FileTracker>
}
