import { Container } from "./styles"


type SeparatorLineProps = React.HTMLAttributes<HTMLHRElement> & {
  children?: string | React.ReactNode
}

export function SeparatorLine({
  children,
  ...rest
}: SeparatorLineProps) {
  return (
    <Container>
      <div
        {...rest}
      />
      {children && (
        <span>{children}</span>
      )}
    </Container>
  )
}