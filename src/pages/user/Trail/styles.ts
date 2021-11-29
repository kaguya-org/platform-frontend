import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS, FONTS_COLORS, GLOBAL_COLORS } from '../../../theme';

export const Content = styled.div`
  width: 100%;
  padding-left: 3.6rem;
  margin: 6.4rem 6.4rem 6.4rem 7.8rem;

  display: flex;
  flex-direction: column;

  width: 100%;

  > section {
    display: flex;
    gap: 1.8rem;

    margin-top: 3.2rem;
  }
`;

export const TrailInfo = styled.aside`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 2.6rem;

  width: 100%;
  max-width: 99.0rem;
  height: min-content;

  section {
    width: 100%;

    &.principal_trail_info {
      display: flex;
      align-items: flex-start;
      gap: 2.4rem;

      background: var(--second-background);
      padding: 3.2rem;
      border-radius: 0.8rem;

      > img {
        width: 12.8rem;
        height: 12.8rem;
        border-radius: 0.8rem;
      }

      header {
        display: flex;
        flex-direction: column;
        width: 100%;
        
        div {
          display: flex;
          justify-content: space-between;

          h1 {
            margin-bottom: 1.2rem;
            font-size: 2.6rem;
              
            span {
              font-size: 2.6rem;
              font-family: var(--second-font);
              color: var(--second-color);
            }
          }

          button {
            svg {
              width: 2.2rem;
              height: 2.2rem;
            }
          }
        }

        > p.trail_description {
          margin-top: 1.6rem;
          letter-spacing: 0.8px;
          font-size: 1.6rem;
          color: #c4c4c4;
        }
      }
    }

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
  }
`;

export const PlayListAndExerciciesContainer = styled.main`
  flex: 1;
  grid-area: playListExerciciesContainer;
`;

export const PlayListAndExercicie = styled.section`
  &:not(:first-child) {
    margin-top: 3.2rem;
  }
`;

export const PlayList = styled(Link)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  background: var(--second-background);

  padding: 3.2rem;

  border-radius: 0.8rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 2px -2px 1px var(--second-color);
  }

  aside {
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

      span {
        font-size: 1.4rem;
      }

      h2 {
        font-size: 1.8rem;
      }

    }

    p {
      font-size: 1.4rem;
      color: #c4c4c4;
      max-width: 80%;
      width: 100%;

      margin: 0.8rem 0 1.6rem;
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