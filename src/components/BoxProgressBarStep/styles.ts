import styled, { css } from 'styled-components';

type BoxProgressBarType = {
  isCompleted?: boolean;
  isCurrent?: boolean;
};

export const Container = styled.div<BoxProgressBarType>`
  position: relative;
  z-index: 5;

  display: flex;
  align-items: center;
  
  &:not(:first-child) {
    margin-top: 20px;
      
    &:before {
      content: "";
      left: 4px;
      width: 2px;
      bottom: 47%;
      height: calc(100% + 4px);
      ${props => props.isCompleted ? css`
        background: var(--second-color);
      `:
      css`
        background: rgb(60, 60, 66);
      `}
      position: absolute;
      z-index: 1;
    }
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  &:after {
    content: "";
    left: 4px;
    width: 2px;
    z-index: 1;
    top: 54%;
    height: calc(100% + -2px);
    ${props => props.isCompleted ? css`
        background: var(--second-color);
      `:
      css`
        background: rgb(60, 60, 66);
      `}
    position: absolute;
  }
`;

export const ProgressBarStep = styled.button<BoxProgressBarType>`
  position: relative;
  cursor: pointer;
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 50%;
  margin-right: 30px;
  flex-shrink: 0;
  z-index: 2;
  transition: box-shadow 0.2s ease 0s;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 50%;

    ${props => props.isCompleted ? css`
      background: var(--second-color);
    `:
    css`
      background: #262832;
    `}

    ${props => props.isCurrent && !props.isCompleted && css`
      background: var(--primary-font-color);
    `}
  }

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    border-radius: 50%;

    ${props => props.isCurrent && css`
      border: 2px solid var(--second-color);
      background: rgb(32, 32, 36);
    `}
  }
`;