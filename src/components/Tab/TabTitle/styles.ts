import { COLORS, FONTS_COLORS, GLOBAL_COLORS } from '@/theme';
import styled, { css } from 'styled-components';

export type TabTitleContainerProps = {
  isSelected?: boolean;
}

export const Container = styled.button<TabTitleContainerProps>`
  padding: 4px 0;
  transition: all 0.2s;

  position: relative;
  top: 2px;

  color: ${FONTS_COLORS.SECONDARY};

  border-bottom: 2px solid transparent;
  
  ${props => props.isSelected && css`
    border-bottom: 2px solid ${COLORS.TERTIARY};
  `}

  &:not(:first-child) {
    padding-left: 16px;
  }

  &:hover {
    filter: brightness(80%);
  }
`;