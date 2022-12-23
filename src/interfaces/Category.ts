import { FileTracker } from 'interfaces/FileTracker'
import { Model } from 'interfaces/Model'

export interface Category extends Model {
  title: string
  code: string
  description?: string
  parentCategory?: Category
  iconImage?: FileTracker
  heroImage?: FileTracker
}
