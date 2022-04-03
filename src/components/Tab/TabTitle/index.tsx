import * as S from './styles';

export type TabTitleProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  tabTitle?: string;
  isSelected?: boolean;
}

export function TabTitle({
  children,
  tabTitle,
  isSelected,
  ...rest
}: TabTitleProps) {
  return (
    <S.Container
      isSelected={isSelected}
      {...rest}
    >
      {tabTitle}
    </S.Container>
  )
}