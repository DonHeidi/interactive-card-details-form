import { ChangeEvent, forwardRef, useEffect, useRef } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
import { Card } from '../types'
import ErrorMessage from '../ErrorMessage'

type CardInputProps = {
  id?: string
  className?: string
  placeholder?: string
  label?: string
}

const CardNumberInput = forwardRef<HTMLInputElement, UseControllerProps<Card, 'cardNumber'> & CardInputProps>(
  (props, ref) => {
    const { field, fieldState } = useController<Card, 'cardNumber'>({ ...props, defaultValue: '' })
    // the reference is needed to set the cursor position
    const refHTML = useRef<HTMLInputElement>(null)
    field.ref(refHTML)

    const error = fieldState.error?.message ? true : false

    // wrapping the onChange from react-hook-form to add the formatting
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      let cursorPosition = refHTML.current?.selectionStart || 0
      const previousLength = value.length
      const formattedValue = value
        .replace(/\D/g, '') // Remove all non-numeric characters
        .replace(/(\d{4})(?=\d)/g, '$1 ') // Add space after every 4 digits, only if followed by another digit
        .trim() // Remove any leading and trailing whitespaces
        .substring(0, 19) // Limit to 16 digits plus 3 spaces for the formatting

      const newLength = formattedValue.length
      if (newLength < previousLength) {
        cursorPosition--
      } else if (previousLength < newLength) {
        cursorPosition += newLength - previousLength
      }

      field.onChange(formattedValue)

      // placing the cursor in the right position
      setTimeout(() => {
        refHTML.current?.setSelectionRange(cursorPosition, cursorPosition)
      })
    }

    useEffect(() => {
      const val = (field.value as String) || ''

      if (refHTML.current) {
        refHTML.current.setSelectionRange(val.length, val.length)
      }
    }, [field.value])

    return (
      <>
        <label htmlFor={props.id} className="text body md dark">
          {props.label}
        </label>
        <div className={`card-form__input-wrapper${error ? ' error' : ''}`}>
          <input
            id={props.id}
            className="card-form__input"
            placeholder={props.placeholder}
            type="text"
            {...field}
            onChange={handleChange}
            maxLength={19}
          />
        </div>
        <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
      </>
    )
  },
)

export default CardNumberInput
