import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import CardInput from '../CardNumberInput'

let renderCount = 0

type ExpirationDate = {
  month: string
  year: string
}

type Card = {
  cardholderName?: string
  cardNumber?: string
  expirationDate?: ExpirationDate
  cvc?: string
}

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

function CreditCard({ cardholderName, cardNumber, expirationDate, cvc }: Card) {
  return (
    <div className="credit-card">
      <CardFront cardholderName={cardholderName} cardNumber={cardNumber} expirationDate={expirationDate} />
      <CardBack cvc={cvc} />
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
      <h1>React Hook Form DevTools {renderCount / 2}</h1>
      <CreditCard {...watch()} />
      <section>
        <form onSubmit={handleSubmit(onSubmit)} method="GET" className="card-form" noValidate>
          <div className="field row row--full">
            <label htmlFor="cardholderName" className="card-form__label">
              Cardholder Name
            </label>
            <input
              id="cardholderName"
              type="text"
              className="card-form__input"
              {...register('cardholderName', {
                required: "Can't be blank",
                pattern: {
                  value: /^[a-z ,.'-]+$/i,
                  message: 'Invalid name',
                },
              })}
            />
            <p className="card-form__message">{errors.cardholderName?.message}</p>
          </div>
          <div className="field row row--full">
            <label htmlFor="cardNumber" className="card-form__label">
              Card Number
            </label>
            <Controller
              name="cardNumber"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <CardInput
                  id="cardNumber"
                  name="cardNumber"
                  className="card-form__input"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <p className="card-form__message">{errors.cardNumber?.message}</p>
          </div>

          <fieldset className="fieldset row row--half row--left">
            <legend className="card-form__label">Exp. Date (MM/YY)</legend>
            <div className="field">
              <label htmlFor="expiration-date-month" className="card-form__label" hidden>
                Month
              </label>
              <input
                id="expiration-date-month"
                type="text"
                className="card-form__input"
                {...register('expirationDate.month', { required: "Can't be blank" })}
              />
              <p className="card-form__message">{errors.expirationDate?.month?.message}</p>
            </div>
            <div className="field">
              <label htmlFor="expiration-date-year" className="card-form__label" hidden>
                Year
              </label>
              <input
                id="expiration-date-year"
                type="text"
                className="card-form__input"
                {...register('expirationDate.year', { required: "Can't be blank" })}
              />
              <p className="card-form__message">{errors.expirationDate?.year?.message}</p>
            </div>
          </fieldset>
          <div className="field row row--half row--right">
            <label htmlFor="cardCVC" className="card-form__label">
              CVC
            </label>
            <input
              id="cardCVC"
              type="text"
              className="card-form__input"
              {...register('cvc', { required: "Can't be blank" })}
            />
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
