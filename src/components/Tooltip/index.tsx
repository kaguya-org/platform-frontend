import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { BiErrorCircle } from 'react-icons/bi';

import { Container, TooltipType } from './styles';

type ElementProps = React.HTMLAttributes<HTMLDivElement>;

interface TooltipProps {
  title: string;

  containerProps?: ElementProps;

  svgProps?: {
    className?: string;
    style?: React.CSSProperties;
  };

  children?: ReactNode;

  type?: TooltipType;
  showIcon?: boolean;
  icon?: IconType;
}

export function Tooltip({ 
  title, 
  type = 'normal', 
  icon: Icon, 
  children,
  showIcon = true,
  ...rest}: TooltipProps) {
  return (
    <Container type={type} {...rest.containerProps}>
      {showIcon && (
        !Icon ? (
          <BiErrorCircle {...rest.svgProps} />
        ) : (
          <Icon />
        )
      )}
      {children}
      <span>{title}</span>
    </Container>
  );
}
