import styled, {css} from 'styled-components';

type ProgressBarProps = {
  percent: number | 0;
};

export const Container = styled.div<ProgressBarProps>`
  height: 8px;
  width: 90%;

  position: relative;
  margin: 0 auto;

  span {
    p {
      position: absolute;
      top: -24px;
      left: ${({ percent }) => percent - 2}%;

      font-size: 12px;
      letter-spacing: 0.8px;
    }
  }

  strong {
    &:before {
      content: '';
      z-index: 10;

      border-radius: 50%;
      border: 1px solid var(--second-color);
      background: var(--third-background);
      position: absolute;
      width: 18px;
      height: 18px;
      left: -16px;
      top: -6px;
    }

    &:after {
      content: '';
      z-index: 10;

      border-radius: 50%;

      ${props => props.percent === 100 ? css`
        background: var(--second-color);
      ` : css`
        background: var(--third-background);
      `}

      position: absolute;
      width: 18px;
      height: 18px;
      right: -16px;
      top: -6px;

    }

    svg {
      position: absolute;
      width: 14px;
      height: 14px;
      top: -4px;
      right: -14px;
      z-index: 11;

      path {
        ${props => props.percent === 100 ? css`
        color: var(--third-background);
      ` : css`
        color: var(--second-color);
      `}
      }
    }
  }
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
`;

export const Background = styled(BaseBox)`
  background: var(--third-background);
  width: 100%;
`;

export const Progress = styled(BaseBox)<ProgressBarProps>`
  background: var(--second-color);
  width: ${props => props.percent}%;
`;
