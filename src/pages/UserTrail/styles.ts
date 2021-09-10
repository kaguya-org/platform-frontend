import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  padding-left: 36px;
  margin: 64px 48px 32px 64px;
  display: flex;
  /* align-items: flex-start; */
  gap: 18px;
  /* grid-template-areas: "trailInfo trailInfo"
                      ".  playListExerciciesContainer";
  grid-template-columns: 60% 1fr; */
  width: 100%;
`;

export const TrailInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 26px;

  /* grid-area: trailInfo; */
  width: 100%;
  max-width: 990px;
  height: min-content;

  background: var(--second-background);

  padding: 32px;

  border-radius: 8px;

  > div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

    img {
      width: 128px;
      height: 128px;
      border-radius: 6px;
    }

    span {
      margin-top: 12px;
      color: #c4c4c4;
      display: flex;
      align-items: center;
      gap: 4px;

      svg path {
        color: #c4c4c4;
      }
    }

    aside {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      div {
        display: flex;
        justify-content: space-between;
      }
    }
  }
 
  > aside {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      
      h1 {
        margin-bottom: 12px;
        font-size: 26px;
          
        span {
          font-size: 26px;
          font-family: var(--second-font);
          color: var(--second-color);
        }
      }
        
      button {
        background: #242731;

        padding: 12px 28px;
        border-radius: 6px;

        display: flex;
        align-items: center;
        gap: 8px;

        transition: all 0.2s;
        &:hover {
          filter: brightness(110%);
        }
        svg {
          width: 22px;
          height: 22px;
        }
      }
    }

    > p {
      margin-top: 16px;
      letter-spacing: 0.8px;
      font-size: 16px;
      color: #c4c4c4;
    }
  }
`;

export const PlayListAndExerciciesContainer = styled.main`
  flex: 1;
  grid-area: playListExerciciesContainer;
`;

export const PlayListAndExercicie = styled.section`
  &:not(:first-child) {
    margin-top: 64px;
  }
`;

export const PlayList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  background: var(--second-background);

  padding: 32px;

  border-radius: 8px;

  aside {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;

    margin-bottom: 22px;

    > div {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;

      h2 {
        font-size: 18px;
      }

    }

    p {
      font-size: 14px;
      color: #c4c4c4;
      max-width: 80%;
      width: 100%;

      margin: 8px 0 16px;
    }
  }
`;

export const Exercicie = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  background: var(--second-background);

  padding: 32px;
  margin-top: 16px;
  height: 100%;

  border-radius: 8px;

  aside {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > svg {
      width: 64px;
      height: 64px;

      path {
        color: #262832;
      }
    }

    div {
      h2 {
        font-size: 18px;
      }  

      span {
        font-size: 14px;
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
      gap: 4px;

      &.exercicie_notStarted {
        color: #F01138;

        svg {
          width: 12px;
          height: 12px;
          path {
            color: #F01138;
          }
        }
      }

      &.exercicie_started {
        color: #F0E10C;

        svg {
          width: 12px;
          height: 12px;
          path {
            color: #F0E10C;
          }
        }
      }

      &.exercicie_completed {
        color: #04D94A;

        svg {
          width: 12px;
          height: 12px;
          path {
            color: #04D94A;
          }
        }
      }
    }

    button {
      border-radius: 6px;
      margin-top: 20px;

      display: flex;
      align-items: center;
      gap: 4px;

      transition: all 0.2s;
      &:hover {
        color: var(--second-color);

        svg path{
          color: var(--second-color);
        }
      }
      svg {
        width: 22px;
        height: 22px;
      }
    }
  }
`;