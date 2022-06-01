export const MaxNumber = (str: any = null, number: number = 999) => {
  const newStr = Number(str)

  return newStr > number ? number : newStr
}
