import styled, { css } from 'styled-components';

type ButtonProps = {
  styleType: 'primary' | 'secondary' | 'ternary' | 'quaternary' | 'quiternary'
} 
export const ContainerButton = styled.button<ButtonProps>`
  background: #242731;
  color: var(--text-color);

  padding: 12px 28px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 14px;
  letter-spacing: 0.9px;
  text-align: center;

  transition: all 0.2s;

  ${props => props.styleType === 'ternary' && css`
    padding: 8px 20px;
    background-color: transparent;
  `}
  ${props => props.styleType === 'quaternary' && css`
    padding: 0;
    background-color: transparent;
  `}
  ${props => props.styleType === 'quiternary' && css`
    max-width: 200px;
  `}

  &:disabled {
    opacity: 0.6;
    
    &:hover {
      cursor: no-drop;
      filter: initial;
    }
  }

  &:hover {
    filter: brightness(110%);
  }
  svg {
    width: 16px;
    height: 16px;
  }
`