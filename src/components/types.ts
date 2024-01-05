export type ExpirationDate = {
  month: number
  year: number
}

export type Card = {
  cardholderName?: string
  cardNumber?: string
  expirationDate?: ExpirationDate
  cvc?: string
}
