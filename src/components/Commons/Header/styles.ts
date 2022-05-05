import styled, { keyframes } from 'styled-components';
import { BACKGROUND, COLORS, FONTS_COLORS } from '../../../theme';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to left, ${BACKGROUND.TERNARY}, ${BACKGROUND.PRIMARY});
  width: 100%;
`;

const appearFromLeft = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(-15%); 
  }

  100% { 
    transform: translateX(0%); 
    opacity: 1;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  max-width: 1100px;
  width: 100%;
  padding: 1.6rem 0;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    a {
      color: ${FONTS_COLORS.SECONDARY};
      transition: all 0.2s;
      position: relative;
      font-size: 1.4rem;

      &.login {
        background: ${COLORS.PRIMARY};
        color: ${FONTS_COLORS.PRIMARY};
        padding: 0.8rem 2.4rem;
        border-radius: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.9px;
      }

      &:hover {
        color: ${COLORS.PRIMARY};

        &.login {
          color: ${FONTS_COLORS.PRIMARY};
        }

        &.animation-none {          
          &:before {
            animation: none;
            width: 0;
          }
        }
        
        &:before {
          content: '';
          position: absolute;
          height: 0.2rem;
          background: ${COLORS.PRIMARY};
          left: 0;
          bottom: -1.2rem;
          width: 100%;

          animation: ${appearFromLeft} 0.4s;
        }
      }
    }
  }
`;