import styled, { css } from 'styled-components';
import { COLORS, FONTS_COLORS } from '../../theme';

export type TooltipType = 'normal' | 'error';

type TooltipProps = {
  type: TooltipType;
}

const tooltipCssError = css`
  svg {
    color: ${COLORS.STATUS_ERROR};
    
    path {
      color: ${COLORS.STATUS_ERROR};
    }
  }
  
  span {
    background: ${COLORS.STATUS_ERROR};
    
    &::before {
      border-color: ${COLORS.STATUS_ERROR} transparent;
    }
  }
`;

const tooltipCssNormal = css`
  svg {
    color: ${FONTS_COLORS.PRIMARY};

    path {
      color: ${FONTS_COLORS.PRIMARY};
    }
  }
  
  span {
    background: ${COLORS.PRIMARY};

    &::before {
      border-color: ${COLORS.PRIMARY} transparent;
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
  margin-left: 1.6rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    margin: 0;
  }
  
  span {
    width: 18.0rem;
    padding: 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    
    position: absolute;
    bottom: calc(100% + 1.2rem);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style:solid;
      border-width: 0.6rem 0.6rem 0 0.6rem;
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