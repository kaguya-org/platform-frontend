import styled from 'styled-components';

export const ContainerButton = styled.button`
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