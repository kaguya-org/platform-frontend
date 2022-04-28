import { COLORS } from '@/theme';
import styled, { keyframes } from 'styled-components';

type LoadingContainerProps = {
  size?: string;
};

const animate1 = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`

const animate2 = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
`

const animate3 = keyframes`
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
`
const animate4 = keyframes`
  0% {
    top: 100%;
  }
  100% {
    top: -100%;
  }
`

export const SquareLoading = styled.div<LoadingContainerProps>`
  width: ${(props) => props.size || '18px'};
  height: ${(props) => props.size || '18px'};

  overflow: hidden;
  position: relative;
  span {
    position: absolute;

    &:nth-child(1) {
      animation: ${animate1} 0.5s linear infinite;
      animation-delay: 0s;
      z-index: 1;
      background: linear-gradient(to right, transparent, ${COLORS.SECONDARY});
      top: 0;
      left: -100%;
      height: 30%;
      width: 100%;
    }

    &:nth-child(2) {
      animation: ${animate2} 0.5s linear infinite;
      animation-delay: 0.25s;
      z-index: 2;
      background: linear-gradient(to bottom, transparent, ${COLORS.SECONDARY});
      top: -100%;
      right: 0;
      height: 100%;
      width: 30%;
    }

    &:nth-child(3) {
      animation: ${animate3} 0.5s linear infinite;
      animation-delay: .5s;
      z-index: 3;
      background: linear-gradient(to left, transparent, ${COLORS.SECONDARY});
      bottom: 0;
      left: 100%;
      height: 30%;
      width: 100%;
    }
    &:nth-child(4) {
      animation: ${animate4} 0.5s linear infinite;
      animation-delay: .75s;
      z-index: 4;
      background: linear-gradient(to top, transparent, ${COLORS.SECONDARY});
      top: 100%;
      left: 0;
      height: 100%;
      width: 30%;
    }
  }
`

export const LoadingContainer = styled.div<LoadingContainerProps>`
  width: ${({size}) => size};
  height: ${({size}) => size};
`;

const circleLoadingKeyFrame = keyframes`
  from {
    transform: rotate(0deg);
  }
  to { 
    transform: rotate(360deg);
  }
`;

export const CircleLoading = styled.svg<LoadingContainerProps>`
  width: 100%;
  height: 100%;
	border: solid 4px var(--primary-font-color);
	border-radius: 50%;
	border-right-color: transparent;
	border-bottom-color: transparent;

  transition: all 0.5s ease-in;
  animation: ${circleLoadingKeyFrame} 1s linear infinite;
`;