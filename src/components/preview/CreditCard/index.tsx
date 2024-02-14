import CardFront from '../CardFront'
import CardBack from '../CardBack'
import { Card } from '../../types'

export default function CreditCard({ cardholderName, cardNumber, expirationDate, cvc }: Card) {
  return (
    <div className="card__container">
      <CardFront cardholderName={cardholderName} cardNumber={cardNumber} expirationDate={expirationDate} />
      <CardBack cvc={cvc} />
    </div>
  )
}
