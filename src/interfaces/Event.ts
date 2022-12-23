import { Expert } from 'interfaces/Expert'
import { Model, ModelRef } from 'interfaces/Model'
import { User } from 'interfaces/User'

export enum EventFrequency {
  Yearly = 'yearly',
  Monthly = 'monthly',
  Weekly = 'weekly',
  Daily = 'daily',
  Hourly = 'hourly',
  Minutely = 'minutely',
  Secondly = 'secondly',
}

export enum Weekday {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export enum Month {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}

export interface EventRecursion {
  frequency: EventFrequency
  interval: number
  maxOccurrences?: number
  endDate?: string
  weekdays?: Weekday[]
  position?: number[]
  monthDay?: number[]
}

export interface EventDate {
  timeZone: string
  date: string
}

export interface EventReservation extends Model {
  user: ModelRef<User>
  event: ModelRef<Event>
  createdAt: string
  createdBy: ModelRef<User>
}

export interface Event<T = void> extends Model {
  instanceId: string
  title: string
  description?: string
  originalStartDate: EventDate
  startDate: EventDate
  endDate: EventDate
  allDay: boolean
  recursion?: EventRecursion
  eventData?: T
  currentUserReservation?: ModelRef<EventReservation>
  expert?: ModelRef<Expert>
  parentEvent?: ModelRef<Event<T>>
  createdBy: ModelRef<User>
}
