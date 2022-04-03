import { BACKGROUND, FONTS_COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    border-bottom: 2px solid ${BACKGROUND.DEFAULT_INPUT};

    width: 100%;

    margin: 16px 0; 
  }

  p {
    color: ${FONTS_COLORS.SECONDARY};
    font-size: 1.4rem;
  }
`;
