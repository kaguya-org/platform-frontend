import { FONTS } from '@/theme';
import styled, { css, keyframes } from 'styled-components';

type ContainerProps = {
  type?: 'success' | 'info' | 'error';
}

const styles = {
  info: css``,
  success: css``,
  error: css``,
};

const animateToast = keyframes`
  0% {
    opacity: 0;
    transform: translateX(200%);
  }
  40% {
    opacity: 1;
  }
  70% {
    transform: translateX(0);
  }
  85% {
    transform: translateX(20%);
  }
  100% {
    transform: translateX(0);
  }
`

export const Container = styled.div<ContainerProps>`
  position: relative;

  font-family: ${FONTS.PRIMARY};
  font-weight: bold;
  cursor: pointer;

  max-width: 400px;
  margin: 10px 0;
  padding: 10px 60px 10px 20px;

  border: 2px solid transparent;
  border-radius: 11px;

  animation: ${animateToast} 0.5s ease-in-out;

  backdrop-filter: blur(10px);

  ${props => styles[props.type || 'info']}

  > p {
    font-size: 12px;
  }

  > button {
    position: absolute;
    top: 10px;
    right: 20px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  
  > strong {
    font-weight: bold;
  }

  > svg {
    flex-shrink: 0;
    margin-right: 10px;
  }
`;