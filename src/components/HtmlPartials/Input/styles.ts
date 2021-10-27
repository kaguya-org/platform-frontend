import styled, { css } from 'styled-components';

type ContainerProps = {
  isError: boolean;
}

export const Container = styled.label<ContainerProps>`
  &.labelInput {
    background: #262832;
    padding: 16px;
    cursor: text;
    border-radius: 8px;
    
    border: 2px solid transparent;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    ${props => props.isError && css`
      border: 2px solid var(--input-error-color);
    `};

    > svg {
      width: 16px;
      height: 16px;
      margin-right: 16px;
      color: #c4c4c4;

      path, line, circle {
        color: #c4c4c4;
      }
    }

    &:not(:first-child) {
      margin-top: 12px;
    }

    &:last-child {
      margin-bottom: 22px;
    }

    input, textarea {
      font-size: 14px;
      padding-top: 6px;
      width: 100%;

      background: none;
      border: none;
      outline: none;
      color: #c4c4c4;
      
      letter-spacing: 0.7px;
    }

    textarea {
      height: 100px;
      appearance: none;
      resize: none;
    }

    input + span,
    textarea + span {
      position: absolute;
      top: 4px;
      left: 0;
      transition: all 0.2s;
      color: #c4c4c4;

      font-size: 14px;
    }

    input:focus + span,
    input:not(:placeholder-shown) + span,
    textarea:focus + span,
    textarea:not(:placeholder-shown) + span {
      top: -14px;
      font-size: 12px;
    }
  }
`;

export const Content = styled.span`
  position: relative;

  flex: 1;
`;
