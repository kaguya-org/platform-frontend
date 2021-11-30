import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BACKGROUND, COLORS, FONTS_COLORS, GLOBAL_COLORS, SHADOW_COLORS } from '../../../theme';

export const Content = styled.div`
  width: 100%;
  padding-left: 4.8rem;
  margin: 6.4rem;
  margin-left: 7.8rem;

  display: flex;
  flex-direction: column;

  width: 100%;

  > section {
    display: flex;
    justify-content: space-between;
    gap: 1.8rem;

    margin-top: 3.2rem;

    @media(max-width: 1600px) {
      flex-direction: column;
      align-items: center;
    }
  }

  @media(max-width: 840px) {
    margin: 3.2rem;
    margin-top: 8rem;
    padding: 0;
  }
`;

export const TrailInfoContainer = styled.aside`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 2.6rem;

  width: 100%;
  max-width: 92rem;
  height: min-content;

  section {
    width: 100%;
  }

  @media(max-width: 1600px) {
    section {
      margin-bottom: 1.6rem;
    }
  }
`;

export const PrincipalTrailInfo = styled.section`
  &.principal_trail_info {
    display: flex;
    align-items: flex-start;
    gap: 2.4rem;

    background: var(--second-background);
    padding: 3.2rem;
    border-radius: 0.8rem;

    position: relative;

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
    }
  }
`;

export const TrailInfo = styled.div`
  &.trail_info {
    header {
      display: flex;
      gap: 1.6rem;

      width: 100%;

      > img {
        width: 8.2rem;
        height: 8.2rem;
        border-radius: 0.8rem;
      }
      
      div {
        display: flex;
        justify-content: space-between;

        height: max-content;
        width: 100%;

        .trail_title {
          font-size: 2.6rem;
          font-family: var(--second-font);
        }

        h1.trail_title {
          margin-bottom: 1.2rem;
            
          span {
            color: var(--second-color);
            margin-left: 0.4rem;
          }
        }

        button {
          svg {
            width: 2.2rem;
            height: 2.2rem;
          }
        }
      }
    }

    > p.trail_description {
      margin-top: 1.6rem;
      letter-spacing: 0.8px;
      font-size: 1.6rem;
      color: #c4c4c4;
    }
      
    @media(max-width: 1100px) {
      header div {
        button {
          position: absolute;
          top: -1rem;
          right: -1rem;
          background: ${BACKGROUND.PRIMARY};
          padding: 0.4rem;
          border-radius: 50%;

          svg {
            width: 3.2rem;
            height: 3.2rem;
            padding: 0.4rem;
          }

          span {
            display: none;
          }
        }
      }
    }
        
    @media(max-width: 920px) {
      header {
        div {
          .trail_title {
            font-size: 2rem;
          }
        }
      }

      > p.trail_description {
        font-size: 1.2rem;
      }
    }

    @media(max-width: 640px) {
      header {
        > img {
          width: 4.8rem;
          height: 4.8rem;
        }
      }
    }

    @media(max-width: 480px) {
      header div {
        .trail_title {
          font-size: 1.4rem;
        }
      }
    }
  }
`;

export const OthersTrailInfo = styled.section`
  &.others_trail_info {
    margin-top: 1.6rem;

    header {
      margin-bottom: 0.8rem;
    }

    .others_info_container {
      background: var(--second-background);
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
  }

  @media(max-width: 1600px) {
    &.others_trail_info {
      display: none;
    }
  }
`;

export const PlayListAndExerciciesContainer = styled.main`
  max-width: 66rem;
  width: 100%;
`;

export const PlayListAndExercicie = styled.div`
  &:not(:first-child) {
    margin-top: 3.2rem;
  }
`;

export const PlayList = styled(Link)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  position: relative;

  background: var(--second-background);

  padding: 3.2rem;

  border-radius: 0.8rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 2px -2px 1px var(--second-color);
  }

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

      span.playlist_classes_total {
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

        span.playlist_classes_total {
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

  background: var(--second-background);

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

export const NotFoundPlaylists = styled.section`
  max-width: 66rem;
  width: 100%;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: left;
  
  img {
    width: 24rem;
    height: 24rem;
  }

  .not_found_playlists_text {
    margin-top: 2.4rem;

    h2 {
      font-size: 1.6rem;  
      font-weight: 500;
      color: ${FONTS_COLORS.SECONDARY};
      
      max-width: 360px;
      margin-top: 0.8rem;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-top: 1.6rem;

      span {
        font-size: 1.4rem;
      }

      button {
        max-width: 24rem;
        margin-top: 0.8rem;
      }
    }
  }

  @media(max-width: 1600px) {
    margin-top: 2.4rem;
  }

  @media(max-width: 1100px) {
    img {
      width: 15rem;
      height: 15rem;
    }
  }
`;