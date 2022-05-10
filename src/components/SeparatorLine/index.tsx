import { Container } from "./styles"


type SeparatorLineProps = React.HTMLAttributes<HTMLHRElement> & {
  children?: string | React.ReactNode
}

export function SeparatorLine({
  children,
  ...rest
}: SeparatorLineProps) {
  return (
    <Container {...rest} >
      <div />
      {children && (
        <span>{children}</span>
      )}
    </Container>
  )
}