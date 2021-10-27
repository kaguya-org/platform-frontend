import styled, { css } from 'styled-components';

export type TooltipType = 'normal' | 'error';

type TooltipProps = {
  type: TooltipType;
}

const tooltipCssError = css`
  svg {
    color: var(--input-error-color);
    
    path {
      color: var(--input-error-color);
    }
  }
  
  span {
    background: var(--input-error-color);
    
    &::before {
      border-color: var(--input-error-color) transparent;
    }
  }
`;

const tooltipCssNormal = css`
  svg {
    color: var(--primary-font-color);

    path {
      color: var(--primary-font-color);
    }
  }
  
  span {
    background: var(--second-color);

    &::before {
      border-color: var(--second-color) transparent;
    }
  }
`;

const tooltipCssType = {
  error: tooltipCssError,
  normal: tooltipCssNormal,
}

export const Container = styled.div<TooltipProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;

  svg {
    width: 24px;
    height: 24px;
    margin: 0;
  }
  
  span {
    width: 160px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style:solid;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  ${props => tooltipCssType[props.type]}
`;