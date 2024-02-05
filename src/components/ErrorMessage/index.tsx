type ErrorMessageProps = {
  children?: string
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="text error body sm">
      <p>{children}</p>
    </div>
  )
}
