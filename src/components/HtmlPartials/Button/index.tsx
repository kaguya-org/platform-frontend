import { HTMLAttributes, ReactNode } from 'react';

import { 
  ContainerButton 
} from './styles';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;

  children?: ReactNode;
}

export function Button({className, children}: ButtonProps) {

  return (
    <ContainerButton 
      type="button" 
      className={`${className}`}
    >
      {children}
    </ContainerButton>
  )
}