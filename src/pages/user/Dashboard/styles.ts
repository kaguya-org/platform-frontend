import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { 
  BACKGROUND, 
  COLORS, 
  FONTS, 
  FONTS_COLORS,
  GLOBAL_COLORS,
} from '@/theme';

export const Container = styled.div`

`;

export const Content = styled.main`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  width: 100%;

  height: 100%;
`;

export const LeftContent = styled.div`
  width: 100%;
  max-width: 980px;

  margin: 64px;
  margin-right: 0;
`;

export const Welcome = styled.section`
  border-radius: 8px;

  display: flex;

  div {
    display: flex;
    flex-direction: column;

    max-width: max-content;
    width: 100%;

    span {
      font-size: 16px;
      font-weight: 500;
      color: ${FONTS_COLORS.SECONDARY};
    }

    h1 {
      letter-spacing: 0.8px;
      margin-top: 8px;
    }
  }
`;

export const LastClasse = styled(Link)`
  margin: 3.2rem 0;
  padding: 3.2rem;
  border-radius: 8px;

  background: ${BACKGROUND.SECONDARY};
  background: 
    linear-gradient(90deg, 
      ${BACKGROUND.SECONDARY} 0%, 
      ${BACKGROUND.SECONDARY} 32%, 
      ${COLORS.SECONDARY} 300%
    );

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: -2px 2px 2px ${COLORS.SECONDARY};
  }

  div.last_classe_information {
    display: flex;
    gap: 16px;

    img {
      width: 7.2rem;
      height: 7.2rem;
      border-radius: 8px;
    }

    div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      h2.title {
        font-size: 1.8rem;
      }

      span.trail_name {
        margin-top: 8px;
        color: ${FONTS_COLORS.SECONDARY};
        letter-spacing: 0.8px;
        
        font-size: 1.4rem;
      }
    }
  }

  > strong {
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 16px;

    span {
      background: ${COLORS.SECONDARY};
      border-radius: 50%;
      padding: 1.2rem;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const MyTrailsSection = styled.section`
  margin: 3.2rem 0;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 16px;

    h1 {
    }

    button {
      font-size: 16px;
      font-weight: 500;

      color: ${FONTS_COLORS.SECONDARY};
      border-bottom: 0.1rem solid ${FONTS_COLORS.SECONDARY};

      letter-spacing: 0.7px;

      transition: color 0.2s;

      &:hover {
        color: ${COLORS.SECONDARY};
        border-bottom: 0.1rem solid ${COLORS.SECONDARY};
      }
    }
  }

  @media(max-width: 1100px) {
    > header {
      h1 {
        font-size: 1.8rem;
      }
      
      button {
        font-size: 1.4rem;
      }
    }
  }
`;

export const MyTrailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  width: 100%;
`;

export const MyTrail = styled(Link)`
  padding: 24px;

  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: ${BACKGROUND.SECONDARY};
  transition: 0.2s;

  border-radius: 8px;

  header {
    display: flex;
    justify-content: center;
    width: 100%;

    img {
      width: 7.2rem;
      height: 7.2rem;
      border-radius: 8px;
    }
  }

  span {
    word-wrap: break-word;
    text-align: center;

    font-size: 24px;
    font-weight: 600;
    font-family: ${FONTS.SECONDARY}, sans-serif;

    max-width: 100%;
    margin: 1rem 0 24px;
  }

  @media(max-width: 1024px) {
    span {
      font-size: 1.8rem;
    }
  }
`;

export const RightContent = styled.section`
  max-width: 480px;
  width: 100%;

  // viewport - navbar height
  height: calc(100vh - 70px);

  padding: 0 16px;

  background: ${BACKGROUND.SECONDARY};
`;

export const OtherTrailsSection = styled.section`
  position: relative;
  
  .other_trails_header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 16px 0;

    .other_trails_header_title {
      padding: 0 8px;
    }

    .see_more_trails {
      font-size: 16px;
      font-weight: 500;

      margin-right: 8px;

      color: ${FONTS_COLORS.SECONDARY};
      border-bottom: 0.1rem solid ${FONTS_COLORS.SECONDARY};

      letter-spacing: 0.7px;

      transition: color 0.2s;

      &:hover {
        color: ${COLORS.SECONDARY};
        border-bottom: 0.1rem solid ${COLORS.SECONDARY};
      }
    }
  }

`;

export const OtherTrailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow: auto;
  position: relative;

  max-height: 80vh;
  padding: 8px;
`;

export const OtherTrail = styled(Link)`
  display: flex;
  gap: 16px;

  padding: 16px;

  background: ${GLOBAL_COLORS.BLACK};

  border-radius: 8px;

  transition: all 0.2s;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 16px;
  }

  > img {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 8px;
  }

  div.trail_information {
    h2.title {
      margin-bottom: 8px;
    }

    span {
      font-size: 16px;
      color: ${FONTS_COLORS.SECONDARY};
    }
  }
`;