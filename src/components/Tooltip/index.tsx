import { ReactNode } from 'react';
import { BiErrorCircle } from 'react-icons/all';

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
