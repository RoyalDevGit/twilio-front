import { atom } from 'recoil'
import Cookies from 'js-cookie'

import { Config } from 'utils/config'

const DRAWER_STATE_COOKIE = Config.getString('DRAWER_STATE_COOKIE')

export enum DrawerCollapsedState {
  Collapsed = 'collapsed',
  Expanded = 'expanded',
}

export const drawerCollapsedState = atom<DrawerCollapsedState>({
  key: 'drawerCollapsedState',
  default: DrawerCollapsedState.Expanded,
  effects: [
    ({ onSet }) => {
      onSet((newState) => Cookies.set(DRAWER_STATE_COOKIE, newState))
    },
  ],
})
