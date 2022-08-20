import {
  BACKGROUND,
  COLORS,
  FONTS,
  FONTS_COLORS
} from '@/theme';
import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';


export const Container = styled.div`

`;

type NoContentProps = {
  fontSize?: string;
}
export const NoContent = styled.div<NoContentProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  align-items: center;
  span {
    margin-top: 14px;
    text-align: center;
    max-width: 200px;
    padding: 0 10px;
    font-size: ${({ fontSize }) => fontSize || '1.5rem'};
  }
`;

export const Content = styled.main`
  display: flex;
  justify-content: space-between;

  width: 100%;

  @media screen and (max-width: 1150px) {
    flex-wrap: wrap;
  }

  height: 100%;
`;

export const LeftContent = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 30px 24px 30px 64px;
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

export const LastLesson = styled(Link)`
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

  div.last_lesson_information {
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
  padding-bottom: 5px;
  overflow-x: auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  width: 100%;
`;

export const MyTrail = styled(Link)`
  padding: 24px;
  position: relative;
  min-width: 250px;
  height: 210px;

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
    
    button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  > span {
    margin-top: 7px !important;
    margin-bottom: 40px !important;
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
  max-width: 580px;
  width: 100%;
  @media screen and (max-width: 1150px) {
    display: none;
  }
  // viewport - navbar height
  height: calc(100vh - 70px);


  background: ${BACKGROUND.SECONDARY};
`;

export const OtherTrailsSection = styled.section`
  position: relative;
  padding: 16px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;

  height: 100%;
  .other_trails_header {
    display: flex;
    align-items: center;
    justify-content: space-between;


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

export const OtherTrailsActions = styled.div`
  display: flex;
  flex-direction: column;
  button {
    padding: 8px 24px;
    align-items: center;
    justify-content: flex-end;
  }
`
export const OtherTrailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow: auto;
  position: relative;

  max-height: 80vh;
  padding-right: 6px;
`;

type OtherTrailProps = {
  isSubAdmin: boolean;
}

export const OtherTrail = styled.div<OtherTrailProps>`
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 25px 16px;
  background: ${shade(.3, BACKGROUND.TERNARY)};
  &:hover {
    background-color: ${shade(.2, BACKGROUND.TERNARY)};

  }

  border-radius: 8px;

  transition: all 0.2s;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 6px;
  }
  &:last-child {
    margin-bottom: 50px;
    ${({ isSubAdmin }) => isSubAdmin && css`
      margin-bottom: 150px;
    `}
  }

  img {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 8px;
  }
  div.trail_information_container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  div.trail_actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .trail_information {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    h2.title {
      margin-bottom: 8px;
    }

    span {
      font-size: 12px;
      color: ${FONTS_COLORS.SECONDARY};
    }
  }
`;