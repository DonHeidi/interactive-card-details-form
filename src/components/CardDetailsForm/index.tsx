import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import CardNumberInput from '../CardNumberInput'
import CreditCard from '../preview/CreditCard'
import { Card } from '../types'
import CardInput from '../CardInput'

export default function Layout() {
  const form = useForm<Card>()
  const { register, control, handleSubmit, watch, reset } = form

  const onSubmit = (data: Card) => {
    console.log('Form submitted', data)
  }

  if (form.formState.isSubmitSuccessful) console.log('Form submitted', form.getValues())

  return (
    <main>
      <CreditCard {...watch()} />
      <section>
        {form.formState.isSubmitSuccessful && (
          <div className="card-form__success">
            <img src="/images/icon-complete.svg" className="card-form__success-icon" />
            <h2 className="text heading xl dark uppercase">Thank you!</h2>
            <p className="text heading lg md dark secondary">We've added your card details</p>
            <button
              className="btn btn--primary text heading lg light bg bg--dark rounded rounded--md full-width"
              onClick={() => reset()}
            >
              Continue
            </button>
          </div>
        )}
        {!form.formState.isSubmitSuccessful && (
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
              <CardNumberInput
                id="cardNumber"
                label="Card Number"
                control={control}
                placeholder="e.g. 1234 5678 9123 0000"
                {...register('cardNumber', {
                  required: "Can't be blank",
                  pattern: { value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/i, message: 'Wrong format: numbers only' },
                  minLength: {
                    value: 19,
                    message: 'Wrong format: 16 numbers only',
                  },
                  maxLength: {
                    value: 19,
                    message: 'Wrong format: 16 numbers only',
                  },
                })}
              />
            </div>

            <fieldset className="fieldset row row--half row--left">
              <legend className="text body uppercase text--md">Exp. Date (MM/YY)</legend>
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
                    pattern: { value: /^[0-9]{2}$/i, message: 'Wrong format: numbers only' },
                    minLength: {
                      value: 2,
                      message: 'Wrong format: 2 numbers only',
                    },
                    maxLength: {
                      value: 2,
                      message: 'Wrong format: 2 numbers only',
                    },
                  })}
                />
              </div>
              <div>
                <CardInput
                  control={control}
                  id="expirationDate.year"
                  label="Year"
                  placeholder="YY"
                  maxLength={2}
                  hideLabel
                  {...register('expirationDate.year', {
                    required: "Can't be blank",
                    pattern: { value: /^[0-9]{2}$/i, message: 'Wrong format: numbers only' },
                    minLength: {
                      value: 2,
                      message: 'Wrong format: 2 numbers only',
                    },
                    maxLength: {
                      value: 2,
                      message: 'Wrong format: 2 numbers only',
                    },
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
                  pattern: { value: /^[0-9]{3}$/i, message: 'Wrong format: numbers only' },
                  minLength: {
                    value: 3,
                    message: 'Wrong format: 3 numbers only',
                  },
                  maxLength: {
                    value: 3,
                    message: 'Wrong format: 3 numbers only',
                  },
                })}
              />
            </div>
            <button
              type="submit"
              className="btn btn--primary row row--full text heading lg light bg bg--dark rounded rounded--md"
            >
              Confirm
            </button>
          </form>
        )}
        {import.meta.env.MODE === 'development' && <DevTool control={control} />}
      </section>
    </main>
  )
}
