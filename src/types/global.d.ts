/* eslint-disable no-var */
/* eslint-disable import/no-default-export */

import {
  ReactNativeWebViewObject,
  NativeAppMessage,
} from '../interfaces/ReactNativeWebView'

declare global {
  var ReactNativeWebView: ReactNativeWebViewObject
  var sendMessageToWebApp: (event: NativeAppMessage) => unknown
}
