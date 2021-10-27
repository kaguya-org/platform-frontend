import { ReactNode } from 'react';

import { 
  ContainerButton 
} from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  children?: ReactNode;
}

export function Button({children, ...rest}: ButtonProps) {

  return (
    <ContainerButton 
      {...rest}
    >
      {children}
    </ContainerButton>
  )
}