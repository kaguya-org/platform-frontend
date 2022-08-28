import { tint } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BACKGROUND, COLORS, FONTS_COLORS, GLOBAL_COLORS } from '../../../theme';

export const Container = styled.div`
`;

export const Content = styled.div`
  padding: max(16px, min(64px, 2vw));
  margin-top: 32px;

  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  
  margin-top: 32px; 
  `;

export const Quotes = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 15px;
  > lord-icon {
    flex-shrink: 0;
  }
  p {
    max-width: 500px;
  }

  line-height: 26px;
  @media screen and (max-width: 400px) {
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
  }

`
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

  background: linear-gradient(90deg, #0D0E12 0%, #181A2159 32%, #a90f64 300% );
  padding: 32px;
  border-radius: 8px;

  position: relative;

  width: 100%;

  @media(max-width: 425px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const TrailInfo = styled.div`
  width: 100%;
  position: relative; 

  .trail_info_header {
    display: flex;
    justify-content: center;
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
      gap: 16px;
      justify-content: space-between; 

      .trail_title {
        font-size: 2.6rem;
        font-family: var(--second-font);
        white-space: nowrap;
        max-width: max(200px, min(800px, 50vw));
        text-overflow: ellipsis;
        overflow: hidden;

        margin-bottom: .8rem;

        span {
          color: var(--second-color);
          margin-left: 0.4rem;
        }
      }

      button {
        background-color: #a90f6478;
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
    padding: 16px 0 32px;

    letter-spacing: 0.8px;
    font-size: 1.6rem;
    line-height: 1.75;
    color: #9a9ea3;
  }

  @media(max-width: 780px) {
    .trail_info_header {
      .trail_name_and_user_action {
        button {
          position: absolute;
          top: -54px;
          right: -16px;

          span {
            display: none;
          }
        }
      }
    }
  }
  
  @media(max-width: 520px) {
    .trail_info_header {
      .trail_name_and_user_action {
        justify-content: center;

        .trail_title {

        }
      }
    }
  }
`;

export const PlayListAndExerciciesContainer = styled.main`
  width: 870px;
  padding-bottom: 60px;
  margin-top: 32px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const FloatRight = styled.aside`
  p {
    line-height: 24px;
    font-size: 14px;
  }
  padding: 60px max(16px, min(64px, 2vw));
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  .image_container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 50px;
    @media screen and (max-width: 500px) {
      flex-wrap: wrap;
      justify-content: center;
    }
    img {
      width: 100px;
    }
  }

  background: #181A21;
  width: 500px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  span {
      color: #a90f64 !important; 
      font-weight: bold;
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
  }
`

export const Community = styled.div`
  h1 {
    margin-bottom: 10px;
  }
  
  a {
    margin-top: 50px;
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

  padding: max(16px, min(64px, 2vw));
  padding-top:48px;

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
      letter-spacing: 0.8px;
      font-size: 1.4rem;
      line-height: 1.75;
      color: #9a9ea3;

      margin: 16px 0 20px;
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
        font-size: 1.4rem;
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
        color: #9a9ea3;
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

export const PlaylistContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  @media screen and (max-width: 1000px) {
    flex-wrap: wrap-reverse;
  }
`
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

