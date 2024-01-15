import { UseControllerProps, useController } from 'react-hook-form'
import { Card } from '../types'
import { forwardRef } from 'react'

type CardInputProps = {
  /** Unique identifier for the input field */
  id: string
  /** Label for the input field */
  label: string
  /** Placeholder text for the input field */
  placeholder: string
  /** Whether to hide the label (optional) */
  hideLabel?: boolean

  maxLength?: number
}

/**
 * `CardInput` is a form input component for credit card details.
 * It uses `useController` from `react-hook-form` for form state management.
 *
 * @param props The props for this component, including standard input attributes and form control props.
 * @param ref A ref to the underlying input element.
 * @returns A rendered input field for a part of the credit card form.
 */
const CardInput = forwardRef<HTMLInputElement, UseControllerProps<Card> & CardInputProps>((props, ref) => {
  const { field, fieldState } = useController(props)

  let value: string | number | undefined

  if (props.name === 'expirationDate.month' || props.name === 'expirationDate.year') {
    value = field.value ? field.value.toString() : ''
  }

  return (
    <>
      <label htmlFor={props.id} className="text body md dark" hidden={props.hideLabel}>
        {props.label}
      </label>
      <div className="card-form__input-wrapper">
        <input
          id={props.id}
          type="text"
          className="card-form__input"
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          {...field}
          value={value}
          ref={field.ref}
        />
      </div>
      <p className="card-form__message">{fieldState.error?.message}</p>
    </>
  )
})

export default CardInput
