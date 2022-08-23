import { IconType } from 'react-icons/lib';
import { Loading } from '../..';

import {
  ContainerButton
} from './styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  styleType?: 'primary' | 'secondary' | 'ternary' | 'quaternary' | 'quiternary';
  loadingSize?: number;
  loadingType?: 'circle' | 'square';
  iconConfig?: {
    icon?: React.ReactElement<IconType>;
    isSide?: 'right' | 'left';
  };
}

export const Button: React.FC<ButtonProps> = ({
  children, 
  isLoading, 
  styleType = 'primary',
  loadingSize,
  loadingType = 'square',
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
        <Loading size={loadingSize} type={loadingType} />         
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
