import styled, { css } from "styled-components";

type ProgressProps = {
  percent: number;
}

export const BackgroundProgress = styled.div<ProgressProps>`
  background: var(--third-background);
  position: relative;
  border-radius: 50rem;
  height: 7px;
  width: 100%;
  > span {
    transform: translate(0, -50%);
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
    right: -10px;
    svg {
      path {
        color: var(--second-color); 
      }
    }
    margin: 0 !important;
    border-radius: 50%;
    background: var(--third-background);
    position: absolute;
    width: 23px;
    height: 23px;
    ${props => props.percent >= 90 && css`
      display: none;
    `}
  }
`;



export const Progress = styled.div<ProgressProps>`
  position: absolute;
  border-radius: 50rem;
  top: 0;
  left: 0;
  background: var(--second-color);
  box-shadow: 0 0 0 1px var(--second-color);
  width: ${props => props.percent}%;
  height: 100%;
  span {
    &:nth-child(2) {
      transform: translate(0, -50%);
      top: 50%;
      right: -10px;
      margin: 0 !important;
      z-index: 1;
      border-radius: 50%;
      border: 2px solid var(--second-color);
      background: var(--third-background);
      position: absolute;
      min-width: 23px;
      height: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path {
          color: var(--second-color); 
        }
      }
    }

    &:nth-child(1) {
      font-size: 15px;
      margin: 0;
      white-space: nowrap;
      right: -17px;
      top: -29px;
      position: absolute;
    }
  }
`;

