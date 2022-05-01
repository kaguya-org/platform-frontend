import { IconType } from 'react-icons/lib';
import { Loading } from '../..';

import { 
  ContainerButton 
} from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingSize?: number;
  iconConfig?: {
    icon?: React.ReactElement<IconType>;
    isSide?: 'right' | 'left';
  };
}

export function Button({
  children, 
  isLoading, 
  loadingSize,
  iconConfig,
  ...rest
}: ButtonProps) {
  return (
    <ContainerButton
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