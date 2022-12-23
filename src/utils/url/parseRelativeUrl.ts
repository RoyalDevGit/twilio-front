export const parseRelativeUrl = (relativePath: string) =>
  new URL(relativePath, 'https://basedomain.org/')
