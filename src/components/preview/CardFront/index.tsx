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
    <div>
      <div>{cardholderDisplay}</div>
      <div className="card-details__number">{numDisplay}</div>
      <div>
        {monthDisplay}/{yearDisplay}
      </div>
    </div>
  )
}
