export const splitFullName = (fullName: string) => {
  const nameParts = fullName
    .split(' ')
    .map((part) => part.trim())
    .filter((part) => part)
  const firstName = nameParts[0]
  const lastName = nameParts.slice(-1)[0]

  return {
    firstName,
    lastName,
  }
}
