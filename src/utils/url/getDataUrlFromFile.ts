export const getBase64FromFile = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const url = reader.result as string
      resolve(url)
    }
    reader.onerror = (error) => reject(error)
  })
