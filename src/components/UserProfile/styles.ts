import styled from 'styled-components';

import { 
  FONTS_COLORS,
} from '@/theme';

export type CSSProfileType = {
  container?: React.CSSProperties;
  link?: React.CSSProperties;
  name?: React.CSSProperties;
}

export const Container = styled.div`
  &.profile {
    display: flex;
    justify-content: flex-end;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
        
  span {
    font-size: 1.6rem;
    color: ${FONTS_COLORS.SECONDARY};
  }
`;