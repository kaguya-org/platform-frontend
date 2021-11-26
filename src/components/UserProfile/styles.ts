import styled, { css, } from 'styled-components';

export type CSSProfileType = {
  container?: React.CSSProperties;
  link?: React.CSSProperties;
  name?: React.CSSProperties;
}

export const Container = styled.header`
  &.profile {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.6rem;
            
      span {
        font-size: 1.6rem;
        text-transform: capitalize;
      }
    }
  }

`;