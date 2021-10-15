import styled, { keyframes } from 'styled-components';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background: var(--third-background);
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
  padding: 16px 0;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    a {
      color: #c4c4c4;
      transition: all 0.2s;
      position: relative;

      &.login {
        background: var(--second-color);
        color: var(--primary-font-color);
        padding: 8px 24px;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 0.9px;
      }

      &:hover {
        color: var(--second-color);

        &.login {
          color: var(--primary-font-color);
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
          height: 2px;
          background: var(--second-color);
          left: 0;
          bottom: -12px;
          width: 100%;

          animation: ${appearFromLeft} 0.4s;
        }
      }
    }
  }
`;