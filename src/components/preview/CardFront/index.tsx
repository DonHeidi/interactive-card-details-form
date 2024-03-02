import { ExpirationDate } from '../../types'
import { createDisplayValue } from '../util'

type CardDetailsFrontProps = {
  cardNumber?: string
  cardholderName?: string
  expirationDate?: ExpirationDate
}

export default function CardFront({ cardNumber, cardholderName, expirationDate }: CardDetailsFrontProps) {
  const cardholderDisplay = cardholderName || 'Jane Appleseed'
  const numDisplay = createDisplayValue(16, cardNumber).replace(/(\d{4})(?=\d)/g, '$1 ')
  const monthDisplay = createDisplayValue(2, expirationDate?.month?.toString())
  const yearDisplay = createDisplayValue(2, expirationDate?.year?.toString())
  return (
    <div className="card card--front rounded--md text md light">
      <img className="card__logo" src="./images/card-logo.svg" alt="credit card logo" />
      <span className="card__name text body lg uppercase">{cardholderDisplay}</span>
      <span className="card__number text heading xl uppercase">{numDisplay}</span>
      <span className="card__expiration-date text body lg uppercase">
        {monthDisplay}/{yearDisplay}
      </span>
    </div>
  )
}
