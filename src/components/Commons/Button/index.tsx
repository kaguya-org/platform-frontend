import { forwardRef, ForwardRefRenderFunction } from 'react';
import { IconType } from 'react-icons/lib';
import { Loading } from '../..';

import { 
  ContainerButton 
} from './styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  styleType?: 'primary' | 'secondary' | 'ternary' | 'quaternary';
  loadingSize?: number;
  iconConfig?: {
    icon?: React.ReactElement<IconType>;
    isSide?: 'right' | 'left';
  };
}

const ButtonFC: ForwardRefRenderFunction<{}, ButtonProps> = ({
  children, 
  isLoading, 
  styleType = 'primary',
  loadingSize,
  iconConfig,
  type,
  ...rest
}) => {
  
  return (
    <ContainerButton
      type={type || 'button'}
      styleType={styleType}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loading size={loadingSize} type="square" />         
      ) : (
        <>
        {iconConfig && iconConfig.isSide === 'left' && (
          iconConfig.icon
        )}
        {children}
        {iconConfig && iconConfig.isSide === 'right' && (
          iconConfig.icon
        )}
        </>
      )}
    </ContainerButton>
  )
}

const Button = forwardRef(ButtonFC);

export { Button }