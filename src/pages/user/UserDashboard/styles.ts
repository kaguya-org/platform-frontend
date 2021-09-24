import styled from 'styled-components';

import backgroundImg from 'assets/images/background.svg';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;

  background: url(${backgroundImg}) no-repeat center center;
  background-size: 100%;
`;

export const Content = styled.div`
  width: 100%;
  padding-left: 36px;
  margin: 64px 48px 32px 64px;
  display: flex;
  align-items: flex-start;
  gap: 18px;

  section h1 {
    position: relative;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.6px;

    &:after {
      content: '';
      position: absolute;

      bottom: -6px;
      left: 0;
      width: 160px;
      height: 2px;
      background-color: var(--primary-color);
    }
  }
`;

export const LeftContent = styled.div`
  max-width: 600px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightContent = styled.aside`
  flex: 1;

  display: grid;
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
`;

export const Welcome = styled.section`
  background: var(--second-background);

  padding: 32px;

  border-radius: 8px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    object-fit: cover;

    border: 4px solid var(--third-color);

    padding: 4px;
  }

  div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 36px;

    h1 {
      letter-spacing: 0.8px;
      font-size: 32px;
      max-width: 90%;

      &:after {
        position: initial;
      }

      span {
        font-size: 24px;
        color: var(--third-color);
        font-family: var(--second-font);
      }
    }

    span {
      margin-top: 16px;
      font-size: 18px;
    }
  }
`;

export const MyTrailsSection = styled.section`
  background: var(--second-background);

  padding: 32px;

  border-radius: 8px;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 32px;

    h1 {
      &:after {
        max-width: 80px;
      }
    }

    button {
      font-size: 14px;
      font-weight: 500;

      color: #c4c4c4;
      border-bottom: 1px solid #c4c4c4;

      letter-spacing: 0.7px;

      transition: color 0.2s;

      &:hover {
        color: var(--third-color);
        border-bottom: 1px solid var(--third-color);
      }
    }
  }
`;

export const MyTrailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const MyTrail = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  background: #242731;
  padding: 24px;
  border-radius: 8px;
  max-width: 210px;
  width: 100%;

  cursor: pointer;

  &:hover {
    header span {
      svg path {
        transition: all 0.2s;

        color: var(--third-color);
      }
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom:0;

    svg {
      width: 24px;
        height: 24px;
    }

    img {
      width: 72px;
      height: 72px;
      border-radius: 8px;
    }

    span {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 8px;

      color: #c4c4c4;
      svg {
        width: 24px;
        height: 24px;
      }
    }

    button {
      background: #242731;
      box-shadow: -3px 3px 0 var(--third-color), 3px -3px 0 var(--second-color);
      padding: 12px;
      border-radius: 8px;

    }
  }

  > span {
    margin: 16px 0 32px;
  }
`;

export const LastClasseSection = styled.section`
  background: var(--second-background);

  padding: 32px;

  border-radius: 8px;

  aside {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;

    width: 100%;
    height: 100%;

    > div {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;

      > div {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        width: 100%;

        p {
          margin-top: 32px;
          color: #c4c4c4;
          max-height: 112px;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 380px;
        }
      }

      img {
        width: 64px;
        height: 64px;
        border-radius: 8px;
      }
    }

    span {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      margin-top: 16px;

      > button {
        box-shadow: 3px 3px 0 var(--third-color),
          -3px -3px 0 var(--second-color);
        padding: 16px;

        gap: 12px;

        svg {
          path {
            color: var(--primary-color);
          }
        }
      }

      h2 {
        font-size: 16px;
        font-weight: 500;

        margin: 16px 0 12px;

        color: #fff;
      }
    }
  }
`;

export const ComunitySection = styled.section`
  background: var(--second-background);

  padding: 32px;

  border-radius: 8px;

  aside {
    height: 100%;

    p {
      max-width: 400px;
      width: 90%;
      margin-top: 32px;
      color: #c4c4c4;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 20px;

      margin-top: 32px;

      button {
        padding: 12px 24px;
        font-size: 16px;

        transition: all 0.2s;

        svg {
          width: 20px;
          height: 20px;
        }

        &:hover {
          filter: brightness(90%);
        }

        &.button-discord {
          background: #5381d3;
        }

        &.button-contribute {
          background: #262832;

          color: #59ca7f;

          &:hover {
            filter: brightness(110%);
          }

          svg path {
            color: #59ca7f;
          }
        }
      }
    }
  }
`;

export const OtherTrailsSection = styled.section`
  background: var(--second-background);

  padding: 32px;
  margin-bottom: 32px;

  border-radius: 8px;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 32px;

    h1 {
      &:after {
        max-width: 80px;
      }
    }

    button {
      font-size: 14px;
      font-weight: 500;

      color: #c4c4c4;
      border-bottom: 1px solid #c4c4c4;

      letter-spacing: 0.7px;

      transition: color 0.2s;

      &:hover {
        color: var(--third-color);
        border-bottom: 1px solid var(--third-color);
      }
    }
  }
`;

export const OtherTrailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
`;

export const OtherTrail = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  background: #242731;
  padding: 24px;
  border-radius: 8px;
  max-width: 200px;
  width: 100%;

  cursor: pointer;

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;

    img {
      width: 72px;
      height: 72px;
      border-radius: 8px;
    }
  }
  
  button {
    background: var(--third-color);
    width: 100%;

    margin-top: 16px;

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover {
      filter: brightness(90%);
    }
  }
`;
