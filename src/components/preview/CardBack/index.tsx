import { createDisplayValue } from '../util'

type CardBackProps = {
  cvc?: string
}

export default function CardBack({ cvc }: CardBackProps) {
  const cvcDisplay = createDisplayValue(3, cvc)
  return (
    <div className="card card--back rounded--md text light">
      <span className="card__cvc">{cvcDisplay}</span>
    </div>
  )
}
