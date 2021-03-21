export const truncate = (str: string, length: number = 140, suffix: string = '...' ) => {
  if (str.length <= length) {
    return str
  }
  return str.slice(0, length) + suffix
}
