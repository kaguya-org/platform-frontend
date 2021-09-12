import { ReactNode } from 'react';
import {
  Container,
  ProgressBarStep
} from './styles';

type Props = {
  isCompleted?: boolean;
  isCurrent?: boolean;

  children?: ReactNode;
};

export function BoxProgressBarStep({isCurrent, isCompleted, children}: Props) {
  return (
    <Container 
      isCompleted={isCompleted} 
      isCurrent={isCurrent}
    >
      <ProgressBarStep 
        isCompleted={isCompleted} 
        isCurrent={isCurrent}
        type="button" 
      />
      {children}
    </Container>
  );
}