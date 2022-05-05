import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BACKGROUND, COLORS, FONTS_COLORS, GLOBAL_COLORS } from '../../../theme';

export const Container = styled.div`
  max-width: 110rem;
  width: 100%;

  height: 100%;
  
  display: flex;
  flex-direction: column;

  margin: 6.4rem auto 0;

`;

export const TrailsSection = styled.section`
  position: relative;

  display: flex;
  flex-direction: column;

  padding: 3.2rem;

  width: 100%;

  background: ${BACKGROUND.SECONDARY};

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1.6rem;
    padding: 2px;

    h1 {
      margin-bottom: 1.6rem;
    }

    button {
      color: ${FONTS_COLORS.SECONDARY};
      border-bottom: 0.1rem solid ${FONTS_COLORS.SECONDARY};

      letter-spacing: 0.7px;

      transition: color 0.2s;

      svg {
        width: 2.2rem;
        height: 2.2rem;
      }

      &:hover {
        color: ${COLORS.SECONDARY};
        border-bottom: 0.1rem solid ${COLORS.SECONDARY};
      }
    }
  }
  
  > button {
    svg {
      width: 4.8rem;
      height: 4.8rem;

      margin-top: 3.2rem;

      path {
        color: ${BACKGROUND.DEFAULT_INPUT};
      }
    }
  }
`;

export const TrailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
`;

export const Trail = styled(Link)`
  display: flex;
  gap: 1.6rem;

  padding: 1.6rem;

  background: ${GLOBAL_COLORS.BLACK};

  border-radius: 0.8rem;

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 2px -2px 2px ${COLORS.QUATENARY};
  }

  > img {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 0.8rem;
  }

  div.trail_information {
    h2.title {
      margin-bottom: 0.8rem;
    }

    span {
      font-size: 1.6rem;
      color: ${FONTS_COLORS.SECONDARY};

    }
  }
  
  @media(max-width: 1024px) {
    > img {
      width: 4.8rem;
      height: 4.8rem;
    }
    div.trail_information {
      h2.title {
        font-size: 1.8rem;
      }

      span {
        font-size: 1.4rem;
      }
    }
  }

  @media(max-width: 1540px) {
    &:not(:first-child) {
      margin-top: 0;
    }
  }
`;