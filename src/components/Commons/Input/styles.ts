import styled, { css } from 'styled-components';
import { BACKGROUND, COLORS, FONTS_COLORS } from '../../../theme';

type ContainerProps = {
  isError: boolean;
}

export const Container = styled.label<ContainerProps>`
  &.labelInput {
    background: ${BACKGROUND.DEFAULT_INPUT};
    padding: 16px;
    cursor: text;
    border-radius: 8px;
    
    border: 2px solid transparent;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    ${props => props.isError && css`
      border: 2px solid ${COLORS.STATUS_ERROR};
    `};

    > svg, svg *{
      width: 16px;
      height: 16px;
      margin-right: 16px;
      color: ${FONTS_COLORS.SECONDARY};
    }

    &:not(:first-child) {
      margin-top: 12px;
    }

    &:last-child {
      margin-bottom: 24px;
    }

    input, textarea {
      font-size: 1.4rem;
      padding-top: 8px;
      width: 100%;

      background: none;
      border: none;
      outline: none;
      color: ${FONTS_COLORS.SECONDARY};
      
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
      color: ${FONTS_COLORS.SECONDARY};

      font-size: 1.4rem;
    }

    input:focus + span,
    input:not(:placeholder-shown) + span,
    textarea:focus + span,
    textarea:not(:placeholder-shown) + span {
      top: -14px;
      font-size: 1.2rem;
    }
  }

  button.lock_unlock_password {
    display: flex;
    align-items: center;

    margin-left: 16px;

    position: relative;
    svg {
      width: 24px;
      height: 24px;
    }

    div.lock_unlock_tooltip {
      position: absolute;
      top: 6px;
      right: 12px;
    }

    &:hover div.lock_unlock_tooltip span {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const Content = styled.span`
  position: relative;

  flex: 1;
`;