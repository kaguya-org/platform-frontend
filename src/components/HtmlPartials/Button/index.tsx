import { ReactNode } from 'react';
import { Loading } from '../..';

import { 
  ContainerButton 
} from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading?: boolean;
  loadingSize?: string;
}

export function Button({children, isLoading, loadingSize, ...rest}: ButtonProps) {

  return (
    <ContainerButton
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loading size={loadingSize} type="circle" />         
      ) : (
        children
      )}
    </ContainerButton>
  )
}