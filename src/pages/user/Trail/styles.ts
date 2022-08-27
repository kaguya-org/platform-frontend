import { tint } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BACKGROUND, COLORS, FONTS_COLORS, GLOBAL_COLORS } from '../../../theme';

export const Container = styled.div`
`;

export const Content = styled.div`
  margin: 64px;

  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  
  margin-top: 32px; 
`;

export const TrailInfoContainer = styled.aside`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  height: min-content;
`;

export const PrincipalTrailInfo = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 24px;

  background: #16171c;
  padding: 32px;
  border-radius: 8px;

  position: relative;

  width: 100%;
/* 
  button.open_others_trail_info {
    display: none;
    position: absolute;
    bottom: -1rem;
    right: -1rem;
    background: ${BACKGROUND.PRIMARY};
    padding: 0.4rem;
    border-radius: 50%;

    &:hover {
      svg path {
        color: ${COLORS.SECONDARY};
      }
    }

    svg {
      width: 3.2rem;
      height: 3.2rem;

      path {
        color: ${GLOBAL_COLORS.GRAY};
        transition: all 0.2s;
      }
    }
  }

  @media(max-width: 1600px) {
    button.open_others_trail_info {
      display: flex;
    }
  } */
`;

export const TrailInfo = styled.div`
  width: 100%;

  .trail_info_header {
    display: flex;
    flex-wrap: wrap;
    gap: 1.6rem;

    width: 100%;

    .trail_image {
      width: 8.2rem;
      height: 8.2rem;
      border-radius: 0.8rem;
    }
    
    .trail_name_and_user_action {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      justify-content: space-between;


      .trail_title {
        font-size: 2.6rem;
        font-family: var(--second-font);
        margin-bottom: .8rem;
        span {
          color: var(--second-color);
          margin-left: 0.4rem;
        }
      }


      button {
        margin-left: 15px;
        svg {
          width: 2.2rem;
          height: 2.2rem;
        }
      }
    }
  }
  p {
    font-size: 1.4rem !important;
    margin: 5px 0;
    span {
      color: #a90f64; 
      font-weight: bold;
    }
  }

  .trail_description {
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;

    letter-spacing: 0.8px;
    font-size: 1.6rem;
    color: #c4c4c4;
  }
`;


export const PlayListAndExerciciesContainer = styled.main`
  width: 820px;
  
  
  margin-top: 32px;
`;
export const FloatRight = styled.aside`
  margin-top: 32px;
  margin-left: 22px;
  padding: 40px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  background: #16171c;
  width: 500px;
  h1 {
    margin-bottom: 50px;
  }
  a {
    display: inline-flex;
    padding: 20px 40px;
    border-radius: 0.8rem;
    font-weight: bold;
    align-items: center;
    background-color: #5865f2;
    svg {
      font-size: 30px;
      margin-right: 7px;
    }
    font-size: 20px;
  }
  border-radius: 0.8rem;

  @media screen and (max-width: 960px) {
    display: none;
  }
`

export const PlayListAndExercicie = styled.div`
  &:not(:first-child) {
    margin-top: 3.2rem;
  }
`;

type PlaylistProps = {
  disabled: boolean
}
export const PlayList = styled(Link)<PlaylistProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid transparent;
  transition-property: border-color;
  transition: all 0.5s;
  &:hover 
  {
    border-color: #FF69F9;
    ${props => props.disabled && css`
      border-color: #ddd;
    `}
  }
  position: relative;

  background: ${tint(.02)('#0D0E12')};

  padding: 32px;

  border-radius: 0.8rem;
  cursor: pointer;

  div.playlist_index {
    background: ${BACKGROUND.PRIMARY};
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 4.8rem;
    height: 4.8rem;

    position: absolute;
    top: -1.6rem;
    left: -1.6rem;

    span {
      color: ${GLOBAL_COLORS.GRAY};
      font-size: 1.6rem;
      font-weight: bold;
    }
  }

  div.playlist_info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;

    margin-bottom: 2.4rem;

    > div {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;

      h2.playlist_title {
        font-size: 1.8rem;
      }

      span.playlist_lessons_total {
        font-size: 1.4rem;
        color: ${FONTS_COLORS.SECONDARY}  
      }

    }

    p.playlist_description {
      font-size: 1.4rem;
      color: #c4c4c4;
      width: 100%;

      margin: 0.8rem 0 1.6rem;
    }
  }

  @media(max-width: 920px) {
    div.playlist_info {
      div {
        flex-direction: column;

        h2.playlist_title {
          font-size: 1.6rem;
        }

        span.playlist_lessons_total {
          margin-top: 0.4rem;
          font-size: 1.2rem;
        }
      }

      p.playlist_description {
        font-size: 1.2rem;
      }
    }
  }
`;

export const Exercicie = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  background: ${tint(.02)('#0D0E12')};

  padding: 3.2rem;
  margin-top: 1.6rem;
  height: 100%;

  border-radius: 0.8rem;

  aside {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > svg {
      width: 6.4rem;
      height: 6.4rem;

      path {
        color: #262832;
      }
    }

    div {
      h2 {
        font-size: 1.8rem;
      }  

      span {
        font-size: 1.4rem;
        color: #c4c4c4;
      }
    }
  }

  > div {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;

      &.exercicie_notStarted {
        color: #F01138;

        svg {
          width: 1.2rem;
          height: 1.2rem;
          path {
            color: #F01138;
          }
        }
      }

      &.exercicie_started {
        color: #F0E10C;

        svg {
          width: 1.2rem;
          height: 1.2rem;
          path {
            color: #F0E10C;
          }
        }
      }

      &.exercicie_completed {
        color: #04D94A;

        svg {
          width: 1.2rem;
          height: 1.2rem;
          path {
            color: #04D94A;
          }
        }
      }
    }

    button {
      border-radius: 0.6rem;
      margin-top: 2rem;

      display: flex;
      align-items: center;
      gap: 0.4rem;

      transition: all 0.2s;
      &:hover {
        color: var(--second-color);

        svg path{
          color: var(--second-color);
        }
      }
      svg {
        width: 2.2rem;
        height: 2.2rem;
      }
    }
  }
`;

export const OtherTrailInfo = styled.section`
  width: 100%;
  flex: 1;
  header {
    margin-bottom: 0.8rem;
  }

  .others_trail_info_container {
    background: ${tint(.02)('#0D0E12')};
    padding: 3.2rem;
    border-radius: 0.8rem;

    display: flex;
    flex-direction: column;

    p {
      font-size: 1.6rem;
      color: ${FONTS_COLORS.SECONDARY};

      display: flex;
      align-items: center;
      gap: 0.8rem;

      &:not(:first-child) {
        margin-top: 1.6rem;
      }

      span {
        color: ${COLORS.SECONDARY};
      }
    }
  }
`;