import { createDisplayValue } from '../util'

type CardBackProps = {
  cvc?: string
}

export default function CardBack({ cvc }: CardBackProps) {
  const cvcDisplay = createDisplayValue(3, cvc)
  return (
    <div className="card card__back">
      <div>{cvcDisplay}</div>
    </div>
  )
}
