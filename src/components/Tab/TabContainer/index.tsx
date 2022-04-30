import { useState } from 'react';
import { TabItemProps } from '../TabItem';
import { TabTitle } from '../TabTitle';

import * as S from './styles';

export type TabContainerProps = {
  children?: React.ReactElement<TabItemProps> | React.ReactElement<TabItemProps>[];
  currentIndex?: number;
}

export function TabContainer({
  children,
  currentIndex = 0
}: TabContainerProps) {
  const [current_index, setCurrentIndex] = useState(currentIndex); 

  function handleChangeCurrentIndex(new_index: number) {
    return setCurrentIndex(new_index);
  }

  return (
    <S.Container>
      <header>
        {Array.isArray(children) ? children.map((item, index) => (
          <TabTitle
            key={index}
            isSelected={index === current_index}
            tabTitle={item?.props.tabTitle}
            onClick={() => handleChangeCurrentIndex(index)}
          />
        )) : (
          <TabTitle
            tabTitle={children?.props.tabTitle}
            />
        )}
      </header>

      {Array.isArray(children) ? children[current_index].props.children : children?.props.children}
    </S.Container>
  )
}