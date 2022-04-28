import styled, { css } from 'styled-components';
import { BACKGROUND, COLORS, FONTS_COLORS } from '../../../theme';

type ContainerProps = {
  isError: boolean;
}

export const Container = styled.label<ContainerProps>`
  &.labelInput {
    background: ${BACKGROUND.DEFAULT_INPUT};
    padding: 1.6rem;
    cursor: text;
    border-radius: 0.8rem;
    
    border: 0.2rem solid transparent;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    ${props => props.isError && css`
      border: 0.2rem solid ${COLORS.STATUS_ERROR};
    `};

    > svg {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 1.6rem;
      color: ${FONTS_COLORS.SECONDARY};

      path, line, circle {
        color: ${FONTS_COLORS.SECONDARY};
      }
    }

    &:not(:first-child) {
      margin-top: 1.2rem;
    }

    &:last-child {
      margin-bottom: 2.4rem;
    }

    input, textarea {
      font-size: 1.4rem;
      padding-top: 0.6rem;
      width: 100%;

      background: none;
      border: none;
      outline: none;
      color: ${FONTS_COLORS.SECONDARY};
      
      letter-spacing: 0.7px;
    }

    textarea {
      height: 10rem;
      appearance: none;
      resize: none;
    }

    input + span,
    textarea + span {
      position: absolute;
      top: 0.4rem;
      left: 0;
      transition: all 0.2s;
      color: ${FONTS_COLORS.SECONDARY};

      font-size: 1.4rem;
    }

    input:focus + span,
    input:not(:placeholder-shown) + span,
    textarea:focus + span,
    textarea:not(:placeholder-shown) + span {
      top: -1.4rem;
      font-size: 1.2rem;
    }
  }

  button.lock_unlock_password {
    display: flex;
    align-items: center;

    margin-left: 1.6rem;

    position: relative;
    svg {
      width: 2.4rem;
      height: 2.4rem;
    }

    div.lock_unlock_tooltip {
      position: absolute;
      top: 0.6rem;
      right: 1.2rem;
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