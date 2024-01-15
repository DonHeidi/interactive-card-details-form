import { ChangeEvent, useEffect, useRef } from 'react'

type CardInputProps = {
  id?: string
  name?: string
  value?: string
  className?: string
  placeholder?: string
  onChange?: (value: string) => void
}

const CardNumberInput = ({ id, name, value, className, placeholder, onChange }: CardInputProps) => {
  // the reference is needed to set the cursor position
  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    let cursorPosition = ref.current?.selectionStart || 0
    const previousLength = value.length
    const formattedValue = value
      //.replace(/\D/g, '') // Remove all non-numeric characters
      .replace(/(\d{4})(?=\d)/g, '$1 ') // Add space after every 4 digits, only if followed by another digit
      .trim() // Remove any leading and trailing whitespaces
      .substring(0, 19) // Limit to 16 digits plus 3 spaces for the formatting

    const newLength = formattedValue.length
    if (newLength < previousLength) {
      cursorPosition--
    } else if (previousLength < newLength) {
      cursorPosition += newLength - previousLength
    }

    if (onChange) onChange(formattedValue)

    setTimeout(() => {
      ref.current?.setSelectionRange(cursorPosition, cursorPosition)
    })
  }

  useEffect(() => {
    const val = value || ''

    if (ref.current) {
      ref.current.setSelectionRange(val.length, val.length)
    }
  }, [value])

  return (
    <input
      ref={ref}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={handleChange}
      maxLength={19}
    />
  )
}

export default CardNumberInput
