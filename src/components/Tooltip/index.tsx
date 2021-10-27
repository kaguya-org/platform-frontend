import { ReactNode } from 'react';
import { BiErrorCircle } from 'react-icons/all';

import { Container, TooltipType } from './styles';

interface TooltipProps {
  title: string;

  containerProps?: {
    className?: string;
  };

  svgProps?: {
    className?: string;
  };

  children?: ReactNode;

  type?: TooltipType;
}

export function Tooltip({ title, type = 'normal', children, ...rest}: TooltipProps) {
  return (
    <Container type={type} {...rest.containerProps}>
      <BiErrorCircle {...rest.svgProps} />
      {children}
      <span>{title}</span>
    </Container>
  );
}
