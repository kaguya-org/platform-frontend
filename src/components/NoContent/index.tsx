import { Lordicon, LordiconProps } from '../Lordicon';

import * as S from './styles';

export interface NoContentProps {
  defaultIcon?: LordiconProps;
  text?: string;
  children?: React.ReactNode;
}

export function NoContent({
  defaultIcon = {
    icon: 'spaFlower',
    size: 100
  },
  text,
  children
}: NoContentProps) {
  return (
    <S.NoContent>
      <Lordicon {...defaultIcon} />
      <span>{text || "Você não possui trilhas"}</span>
      {children}
    </S.NoContent>
  )
}