export const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const NumberFormat = (num: string | number) => formatter.format(Number(num)).split('R$')[1]
