import styled, { css } from 'styled-components';
import { COLORS, FONTS_COLORS } from '../../../theme';

type ContainerProps = {
  isError: boolean;
}

export const Container = styled.label<ContainerProps>`
  color: ${FONTS_COLORS.SECONDARY};
  
  font-size: 1.4rem;
  font-weight: 400;

  cursor: pointer;

  margin: 0.8rem 0 2.4rem 0.4rem;
  padding-left: 2.0rem;

  display: flex;
  align-items: center;

  width: max-content;

  position: relative;

  span.checkmark{
    position: absolute;
    top: 0.2rem;
    left: 0;

    height: 1.5rem;
    width: 1.5rem;
    padding: 0.4rem;
    border-radius: 0.2rem;

    background-color: #fff;
    border: 0.1rem solid gray;

    &::after{
      content: '';
      
      display: none;
      
      position: absolute;
      left: 0.4rem;
      top: 0;

      width: 0.5rem;
      height: 0.9rem;
      
      transform: rotate(45deg);
      
      border-right: 0.2rem solid #fff;
      border-bottom: 0.2rem solid #fff;
    }
  }
  
  input {
    position: absolute;

    opacity: 0;
    height: 0;
    width: 0;

    &:checked ~ .checkmark{
      background-color: ${COLORS.PRIMARY};
      border: none;
    }

    &:checked ~ .checkmark::after{
      display: block;
    }
  }

  ${props => props.isError && css`
    color: ${COLORS.STATUS_ERROR};

    span.checkmark {
    }
  `}
`;