export const getCurrentTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone
