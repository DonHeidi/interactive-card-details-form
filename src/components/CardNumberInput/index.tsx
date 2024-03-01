import { useState } from 'react'
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

interface ChangeEventWithInputType extends ChangeEvent<HTMLInputElement> {
  nativeEvent: InputEvent
}

/**
 * The card number input component
 * @param props The input props
 * @param ref The reference to the input
 * @returns The card number input component
 */
const CardNumberInput = forwardRef<HTMLInputElement, UseControllerProps<Card, 'cardNumber'> & CardInputProps>(
  (props, _) => {
    const { field, fieldState } = useController<Card, 'cardNumber'>({ ...props, defaultValue: '' })
    const refHTML = useRef<HTMLInputElement>(null)

    const [cursorPosition, setCursorPosition] = useState(0)

    function handleChange(event: ChangeEventWithInputType) {
      const { value } = event.target

      const breakPoints = [4, 9, 14]
      const backBreakPoints: number[] = [5, 10, 15]
      const currentCursor = event.currentTarget.selectionStart || 0

      const formattedValue = value
        .replace(/\D/g, '') // Remove all non-numeric characters
        .replace(/(\d{4})(?=\d)/g, '$1 ') // Add space after every 4 digits, only if followed by another digit
        .trim() // Remove any leading and trailing whitespaces
        .substring(0, 19) // Limit to 16 digits plus 3 spaces for the formatting

      field.onChange(formattedValue)

      // TODO possibly need to handle mobile inputs as well.
      // this code snippet needs to run after field.onChange as it updates the value and the cursor position.
      switch (event.nativeEvent.inputType) {
        case 'insertText':
          if (breakPoints.includes(currentCursor)) {
            setCursorPosition(currentCursor + 1)
          } else {
            setCursorPosition(currentCursor)
          }
          break
        case 'deleteContentBackward':
          if (backBreakPoints.includes(currentCursor)) {
            setCursorPosition(currentCursor - 1)
          } else {
            setCursorPosition(currentCursor)
          }
          break
        default:
          setCursorPosition(currentCursor)
          break
      }
    }

    // setting the cursor position
    useEffect(() => {
      if (refHTML.current) {
        refHTML.current.selectionStart = cursorPosition
        refHTML.current.selectionEnd = cursorPosition
      }
    }, [cursorPosition])

    const error = fieldState.error?.message ? true : false

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
            ref={refHTML}
          />
        </div>
        <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
      </>
    )
  },
)

export default CardNumberInput
