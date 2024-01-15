import { Controller, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import CardNumberInput from '../CardNumberInput'
import CreditCard from '../preview/CreditCard'
import { Card } from '../types'
import CardInput from '../CardInput'

export default function Layout() {
  const form = useForm<Card>()
  const { register, control, handleSubmit, formState, watch } = form
  const { errors } = formState

  const onSubmit = (data: Card) => {
    console.log('Form submitted', data)
  }

  return (
    <main>
      <CreditCard {...watch()} />
      <section>
        <form onSubmit={handleSubmit(onSubmit)} method="GET" className="card-form" noValidate>
          <div className="field row row--full">
            <CardInput
              control={control}
              id="cardholderName"
              label="Cardholder Name"
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
          <div className="field row row--full">
            <label htmlFor="cardNumber" className="text body md dark">
              Card Number
            </label>
            <div className="card-form__input-wrapper">
              <Controller
                name="cardNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: "Can't be blank",
                  pattern: { value: /^[0-9]{}$/i, message: 'Wrong format: numbers only' },
                }}
                render={({ field: { onChange, value } }) => (
                  <CardNumberInput
                    id="cardNumber"
                    name="cardNumber"
                    className="card-form__input"
                    placeholder="e.g. 1234 5678 9123 0000"
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
              <CardInput
                control={control}
                id="expirationDate.month"
                label="Month"
                placeholder="MM"
                maxLength={2}
                hideLabel
                {...register('expirationDate.month', {
                  required: "Can't be blank",
                  pattern: { value: /^[0-9]{}$/i, message: 'Wrong format: numbers only' },
                })}
              />
            </div>
            <div className="">
              <CardInput
                control={control}
                id="expirationDate.year"
                label="Year"
                placeholder="YY"
                maxLength={2}
                hideLabel
                {...register('expirationDate.year', {
                  required: "Can't be blank",
                  pattern: { value: /^[0-9]{}$/i, message: 'Wrong format: numbers only' },
                })}
              />
            </div>
          </fieldset>
          <div className="field row row--half row--right">
            <CardInput
              control={control}
              id="cvc"
              label="CVC"
              maxLength={3}
              placeholder="e.g. 123"
              {...register('cvc', {
                required: "Can't be blank",
                pattern: { value: /^[0-9]{}$/i, message: 'Wrong format: numbers only' },
              })}
            />
          </div>
          <button
            type="submit"
            className="btn btn--primary drow row row--full text heading lg light bg bg--dark rounded rounded--md "
          >
            Confirm
          </button>
        </form>
        {import.meta.env.MODE === 'development' && <DevTool control={control} />}
      </section>
    </main>
  )
}
