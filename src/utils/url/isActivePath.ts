import urlJoin from 'proper-url-join'

export const isActivePath = (
  currentPath: string,
  pathToTest: string,
  exact = true
) => {
  // the URL class does not support relative paths
  // hopefully this will change soon: https://github.com/whatwg/url/issues/531
  const FAKE_DOMAIN = 'https://www.fakedomain.com'
  const currentUrl = new URL(urlJoin(FAKE_DOMAIN, currentPath))
  const urlToTest = new URL(urlJoin(FAKE_DOMAIN, pathToTest))

  if (exact) {
    return (
      currentUrl.pathname.toLowerCase() === urlToTest.pathname.toLowerCase()
    )
  }

  return currentUrl.pathname
    .toLowerCase()
    .startsWith(urlToTest.pathname.toLowerCase())
}
