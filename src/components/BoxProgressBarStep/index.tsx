import { ReactNode } from 'react';
import {
  Container,
  ProgressBarStep
} from './styles';

type Props = {
  isCompleted?: boolean;
  isCurrent?: boolean;

  children?: ReactNode;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
};

export function BoxProgressBarStep({isCurrent, isCompleted, buttonProps, children}: Props) {
  return (
    <Container 
      isCompleted={isCompleted} 
      isCurrent={isCurrent}
    >
      <ProgressBarStep 
        isCompleted={isCompleted} 
        isCurrent={isCurrent}
        {...buttonProps}
      />
      {children}
    </Container>
  );
}