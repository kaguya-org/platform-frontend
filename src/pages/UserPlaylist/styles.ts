import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  padding-left: 36px;
  margin: 64px 48px 32px 64px;
  display: flex;
  gap: 18px;
`;

export const CurrentClasseContainer = styled.main`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const CurrentClasse = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  background: var(--second-background);
  border-radius: 8px;

  iframe {
    width: 100%;
    border-radius: 8px 8px 0 0;
    border: none;

    height: 460px;
  }

  > div {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      padding: 24px;
    }

    > div {
      padding: 24px;

      display: flex;
      align-items: center;
      gap: 18px;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;

        &:hover {
          svg path{
            color: var(--third-color);
          }
        }

        svg {
          width: 22px;
          height: 22px;

          path {
            transition: all 0.2s;
          }
        }

        &.classe_liked {
          svg path {
            color: var(--third-color);
          }
        }

        &.classe_deslike {
          svg path {
            color: var(--third-color);
          }
        }
      }
    }
  }
`;

export const ClasseInfo = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 32px;

  background: var(--second-background);
  border-radius: 8px;

  div.classeInfo_switch_buttons {
    display: flex;
    border-bottom: 2px solid #fff;
    margin: 16px 0 24px; 

    button {
      padding: 4px 0;
      transition: all 0.2s;

      border-bottom: 1px solid #fff;
      position: relative;
      top: 2px;

      &:first-child {
      }
      border-bottom: 2px solid var(--second-color);

      &:hover {
        filter: brightness(80%);
      }
    }
  }

  > p {
    color: #c4c4c4;
  }
`;

export const BlocksAndClassesContainer = styled.section`
  flex: 1;
  max-width: 480px;
  background: var(--second-background);

  display: flex;
  flex-direction: column;
  width: 100%;

  border-radius: 8px;
  max-height: 530px;
  overflow: auto;
`;

export const BlockAndClasses = styled.div`
  &:not(:first-child) {
    margin-top: 6px;
  }
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #262832;
  padding: 24px;

  border-radius: 8px 8px 0 0;

  cursor: pointer;

  > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    h2 {
      font-size: 18px;
    }

    span {
      font-size: 14px;
      margin-top: 6px;
      color: #c4c4c4;
    }
  }

  > svg {
    width: 24px;
    height: 24px;
  }
`;

export const Classes = styled.ul`
  padding: 24px;
`;

type ClasseType = {
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export const Classe = styled.li<ClasseType>`
  button {
    color: #a8a8b3;

    ${props => props.isCompleted && css`
      color: var(--second-color);
    `}

    ${props => props.isCurrent && css`
      color: var(--primary-font-color);
      font-weight: bold;
    `}
  }
`;