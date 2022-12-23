import { Expert } from 'interfaces/Expert'
import { User } from 'interfaces/User'
import { DrawerCollapsedState } from 'state/drawerState'

// using | null instead of `?` because Next.js throws an error
// when you send the initial state with `undefined`
export interface AppState {
  user: User | null
  expert: Expert | null
  drawerCollapsedState: DrawerCollapsedState
}
