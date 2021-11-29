import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  BACKGROUND, 
  COLORS, 
  FONTS, 
  FONTS_COLORS,
  GLOBAL_COLORS,
  UNIQUE_CASE_COLORS,
} from '../../../theme';

export const Content = styled.main`
  display: flex;
  justify-content: space-between;
  gap: 1.8rem;
  margin-left: 7.8rem;

  width: 100%;

  @media(max-width: 1540px) {
    flex-direction: column;
    align-items: center;

    padding: 3.2rem;
  }

  @media(max-width: 840px) {
    margin-left: 0;
  }
`;

export const LeftContent = styled.div`
  width: 100%;

  margin: 6.4rem;

  max-width: 110rem;

  @media(min-width: 840px) and (max-width: 1540px) {
    margin: 1.6rem 6.4rem 3.2rem;
  } 
`;

export const Welcome = styled.section`
  border-radius: 0.8rem;

  display: flex;

  div {
    display: flex;
    flex-direction: column;

    max-width: max-content;
    width: 100%;

    span {
      font-size: 1.6rem;
      font-weight: 500;
      color: ${FONTS_COLORS.SECONDARY};
    }

    h1 {
      letter-spacing: 0.8px;
      margin-top: 0.8rem;
    }
  }

  @media(min-width: 1540px) {
    header.profile {
      display: none;
    }
  }
`;

export const LastClasse = styled(Link)`
  margin: 3.2rem 0;
  padding: 3.2rem;
  border-radius: 0.8rem;

  background: ${BACKGROUND.SECONDARY};
  background: 
    linear-gradient(90deg, 
      ${BACKGROUND.SECONDARY} 0%, 
      ${BACKGROUND.SECONDARY} 31%, 
      rgba(101,67,99, 0.7) 100%
    );

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 2px -2px 2px ${COLORS.QUARTENARY};
  }

  div.last_classe_information {
    display: flex;
    gap: 1.6rem;

    img {
      width: 7.2rem;
      height: 7.2rem;
      border-radius: 0.8rem;
    }

    div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      h2.title {
        font-size: 1.8rem;
      }

      span.trail_name {
        margin-top: 0.8rem;
        color: ${FONTS_COLORS.SECONDARY};
        letter-spacing: 0.8px;
        
        font-size: 1.4rem;
      }
    }
  }

  > strong {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    font-size: 1.6rem;

    span {
      background: ${COLORS.QUARTENARY};
      border-radius: 50%;
      padding: 1.2rem;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
  
  @media(max-width: 840px) {
    flex-direction: column;

    div.last_classe_information {
      img {
        width: 4.8rem;
        height: 4.8rem;
      }

      div {
        align-items: center;
      }
    }

    > strong {
      margin-top: 1.6rem;

      span {
        padding: 0.8rem;
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

    margin-bottom: 1.6rem;

    h1 {
    }

    button {
      font-size: 1.6rem;
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
  gap: 1.6rem;

  width: 100%;

  @media(max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const MyTrail = styled(Link)`
  padding: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: ${BACKGROUND.SECONDARY};
  transition: 0.2s;

  border-radius: 0 0 0.8rem 0.8rem;
  border-bottom: 0.1rem solid ${COLORS.PRIMARY};

  :hover {
    background: rgb(20, 20, 32);
  }

  header {
    display: flex;
    justify-content: center;
    width: 100%;

    img {
      width: 7.2rem;
      height: 7.2rem;
      border-radius: 0.8rem;
    }
  }

  span {
    word-wrap: break-word;
    text-align: center;

    font-size: 2.4rem;
    font-weight: 600;
    font-family: ${FONTS.SECONDARY}, sans-serif;

    max-width: 100%;
    margin: 1rem 0 2.4rem;
  }

  @media(max-width: 1024px) {
    span {
      font-size: 1.8rem;
    }
  }
`;

export const ComunitySection = styled.a`
  background: ${BACKGROUND.SECONDARY};
  
  cursor: pointer;

  padding: 3.2rem;

  border-radius: 0.8rem;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;

  transition: all 0.2s;

  &:hover {
    box-shadow: -2px -2px 2px ${UNIQUE_CASE_COLORS.DISCORD};
  }

  > svg {
    width: 7.2rem;
    height: 7.2rem;

    path {
      color: ${UNIQUE_CASE_COLORS.DISCORD};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    h1 {
    }

    p {
      margin-top: 0.8rem;
      color: ${FONTS_COLORS.SECONDARY};

      font-size: 1.6rem;
    }
  }

  @media(max-width: 1100px) {
    div {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1.2rem;
      }
    }
  }

  @media(min-width: 1101px) and (max-width: 1296px) {
    > svg {
      width: 4.8rem;
      height: 4.8rem;
    }

    div {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1.2rem;
      }
    }
  }
`;

export const RightContent = styled.section`
  background: ${BACKGROUND.TERTIARY};
  width: 100%;
  height: 100vh;

  max-width: 56rem;

  @media(max-width: 1540px) {
    height: max-content;
    max-width: 110rem;
  } 
`;

export const RightInternalContent = styled.div`
  padding: 3.2rem;

  @media(max-width: 1540px) {
    header.profile {
      display: none;
    }
  }
`;

export const OtherTrailsSection = styled.section`
  margin-top: 3.2rem;
  position: relative;

  h1 {
    margin-bottom: 1.6rem;
    padding: 2px;
  }
`;

export const OtherTrailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  max-height: 62.0rem;
  overflow: auto;
  position: relative;

  padding: 2px 2px 3.2rem 2px;

  @media(max-width: 1540px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }
`;

export const OtherTrail = styled(Link)`
  display: flex;
  gap: 1.6rem;

  padding: 1.6rem;

  background: ${GLOBAL_COLORS.BLACK};

  border-radius: 0.8rem;

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 2px -2px 2px ${COLORS.QUARTENARY};
  }

  &:not(:first-child) {
    margin-top: 1.6rem;
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

export const NotFoundMyTrails = styled.div`
  display: flex;
  justify-content: center;
  gap: 4.8rem;

  margin-top: 4.8rem;

  img {
    max-width: 32.0rem;
    max-height: 32.0rem;
  }

  div.not_found_my_trails_texts {
    width: max-content;
    h2.title {
      font-size: 3.2rem;
    }
    
    p {
      font-size: 1.6rem;
      color: ${FONTS_COLORS.SECONDARY};

      max-width: 48.0rem;

      margin: 1.2rem 0 1.6rem;
    }
  }
`;