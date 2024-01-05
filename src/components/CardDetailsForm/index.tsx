import { Controller, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import CardInput from '../CardNumberInput'
import CreditCard from '../preview/CreditCard'
import { Card } from '../types'

let renderCount = 0

function CardFront({ cardholderName = '', cardNumber, expirationDate }: Card) {
  return (
    <div className="card card__front">
      <div>{cardholderName}</div>
      <div>{cardNumber}</div>
      <div>{expirationDate?.month}</div>
      <div>{expirationDate?.year}</div>
    </div>
  )
}

function CardBack({ cvc }: Card) {
  return (
    <div className="card card__back">
      <div>{cvc}</div>
    </div>
  )
}

export default function Layout() {
  const form = useForm<Card>()
  const { register, control, handleSubmit, formState, watch } = form
  const { errors } = formState

  const onSubmit = (data: Card) => {
    console.log('Form submitted', data)
  }

  renderCount++
  return (
    <main>
      <CreditCard {...watch()} />
      <section>
        <form onSubmit={handleSubmit(onSubmit)} method="GET" className="card-form" noValidate>
          <div className="field row row--full">
            <label htmlFor="cardholderName" className="text body md dark">
              Cardholder Name
            </label>
            <div className="card-form__input-wrapper">
              <input
                id="cardholderName"
                type="text"
                className="card-form__input placeholder"
                placeholder="e.g. Jane Appleseed"
                {...register('cardholderName', {
                  required: "Can't be blank",

                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: 'Invalid name',
                  },
                })}
              />
            </div>
            <p className="card-form__message">{errors.cardholderName?.message}</p>
          </div>
          <div className="field row row--full">
            <label htmlFor="cardNumber" className="text body md dark">
              Card Number
            </label>
            <div className="card-form__input-wrapper">
              <Controller
                name="cardNumber"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <CardInput
                    id="cardNumber"
                    name="cardNumber"
                    className="card-form__input placeholder"
                    placeholder="e.g. 12034 5678 9123 0000"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <p className="card-form__message">{errors.cardNumber?.message}</p>
          </div>

          <fieldset className="fieldset row row--half row--left">
            <legend className="text body text--md">Exp. Date (MM/YY)</legend>
            <div>
              <label htmlFor="expiration-date-month" className="text body md dark" hidden>
                Month
              </label>
              <div className="card-form__input-wrapper">
                <input
                  id="expiration-date-month"
                  type="text"
                  className="card-form__input placeholder"
                  placeholder="MM"
                  {...register('expirationDate.month', { required: "Can't be blank" })}
                />
              </div>{' '}
              <p className="card-form__message">{errors.expirationDate?.month?.message}</p>
            </div>
            <div className="">
              <label htmlFor="expiration-date-year" className="text body md dark" hidden>
                Year
              </label>
              <div className="card-form__input-wrapper">
                <input
                  id="expiration-date-year"
                  type="text"
                  className="card-form__input placeholder"
                  placeholder="YY"
                  {...register('expirationDate.year', { required: "Can't be blank" })}
                />
              </div>
              <p className="card-form__message">{errors.expirationDate?.year?.message}</p>
            </div>
          </fieldset>
          <div className="field row row--half row--right">
            <label htmlFor="cardCVC" className="text body md dark">
              CVC
            </label>
            <div className="card-form__input-wrapper">
              <input
                id="cardCVC"
                type="text"
                className="card-form__input placeholder"
                placeholder="e.g. 123"
                {...register('cvc', { required: "Can't be blank" })}
              />
            </div>
            <p className="card-form__message">{errors.cvc?.message}</p>
          </div>
          <button type="submit" className="btn-primary row row--full">
            Confirm
          </button>
        </form>
        <DevTool control={control} />
      </section>
    </main>
  )
}
