import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { 
  BACKGROUND, 
  COLORS,
  FONTS_COLORS,
  GLOBAL_COLORS,
  SHADOW_COLORS,
} from '../../theme';

export const Container = styled.header`
  width: 100%;
  padding: 0 64px;

  min-height: 70px;
  position: relative;
  z-index: 1;

  background: linear-gradient(to left, ${BACKGROUND.TERTIARY}, ${BACKGROUND.PRIMARY});

  box-shadow: 2px 2px 15px ${SHADOW_COLORS.BLACK_OPACITY_30};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  .app_logo {
  }
`;

export const LinkItem = styled(Link)`
  padding: 24px 16px;

  &:hover {
    transition: 0.2s all ease-in-out;

    span {
      color: ${COLORS.SECONDARY};

      &:after {
        content: '';

        position: absolute;
        bottom: -24px;
        left: 0;

        width: 100%;
        height: 2px;
        
        background: ${COLORS.SECONDARY};
      }
    }
  }

  span {
    position: relative;

    color: ${FONTS_COLORS.SECONDARY};
    font-size: 1.6rem;

    border-bottom: 2px solid transparent;
  }
`;

export const ViewProfile = styled.div`
  position: relative;
`;

export const SubMenuProfile = styled.div`
  position: absolute;
  right: 0;
  top: 56px;
  z-index: 10;

  display: none;

  &.open {
    display: block;
  }

  &.closed {
    display: none;
  }

  .triangule {
    width: 0; 
    height: 0; 

    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid ${GLOBAL_COLORS.WHITE};

    position: absolute;
    top: -12px;
    right: 50%;
    transform: translateX(50%);
    z-index: 10;
  }
`;

export const SubMenuProfileContent = styled.div`
  background: ${GLOBAL_COLORS.WHITE};
  border-radius: 8px;
`;

export const SubMenuProfileItemStyle = css`
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  padding: 16px;

  font-size: 16px;
  white-space: nowrap;

  &:not(:first-child) {
    border-top: 1px solid ${GLOBAL_COLORS.GRAY};
  }

  &:hover {
    svg, svg path, svg > *, span {
      color: ${COLORS.PRIMARY};
    }
  }

  svg {
    width: 16px;
    height: 16px;
  } 
  svg, svg path, svg > *, span {
    color: ${GLOBAL_COLORS.GRAY};
  }
`

export const SubMenuProfileLinkItem = styled(Link)`
  ${SubMenuProfileItemStyle}

`;

export const SubMenuProfileButtonItem = styled.button`
  ${SubMenuProfileItemStyle}
`;