import styled, { css } from 'styled-components';
import { BACKGROUND, COLORS, GLOBAL_COLORS, FONTS_COLORS } from '../../../theme';

export const Content = styled.div`
  width: 100%;
  padding-left: 4.8rem;
  margin: 6.4rem;
  margin-left: 7.8rem;

  display: flex;
  flex-direction: column;

  > section {
    display: flex;
    justify-content: center;
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

export const CurrentClasseContainer = styled.main`
  width: 100%;
  max-width: 98rem;

  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const CurrentClasse = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  background: ${BACKGROUND.SECONDARY};
  border-radius: 0.8rem;

  iframe {
    width: 100%;
    border-radius: 0.8rem 0.8rem 0 0;
    border: none;

    height: 46rem;
  }

  > div.classe_counts_container {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.6rem;

    > span.views_count {
      font-size: 1.6rem;
    }

    > div.likes_deslikes {
      display: flex;
      align-items: center;
      gap: 2.4rem;

      span {
        display: flex;
        align-items: center;
        gap: 0.6rem;

        cursor: pointer;

        font-size: 1.6rem;

        &:hover {
          svg path{
            color: ${COLORS.SECONDARY};
          }
        }

        svg {
          width: 2.2rem;
          height: 2.2rem;

          path {
            transition: all 0.2s;
          }
        }

        &.classe_liked {
          svg path {
            color: ${COLORS.SECONDARY};
          }
        }

        &.classe_desliked {
          svg path {
            color: ${COLORS.SECONDARY};
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

  padding: 3.2rem;

  background: ${BACKGROUND.SECONDARY};
  border-radius: 0.8rem;

  div.classeInfo_switch_buttons {
    display: flex;
    border-bottom: 0.2rem solid ${GLOBAL_COLORS.WHITE};
    margin: 1.6rem 0 2.4rem; 

    button {
      padding: 0.4rem 0;
      transition: all 0.2s;

      border-bottom: 0.1rem solid ${GLOBAL_COLORS.WHITE};
      position: relative;
      top: 0.2rem;

      border-bottom: 0.2rem solid ${COLORS.TERTIARY};

      &:hover {
        filter: brightness(80%);
      }
    }
  }

  > p.current_classe_description {
    color: ${FONTS_COLORS.SECONDARY};
    font-size: 1.4rem;
  }
`;

export const BlocksAndClassesContainer = styled.aside`
  flex: 1;
  background: ${BACKGROUND.SECONDARY};

  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 38rem;

  border-radius: 0.8rem;
`;

export const BlockAndClasses = styled.div`
  width: 100%;
  max-width: 38rem;

  &:not(:first-child) {
    margin-top: 6px;
  }
`;

export const Block = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #262832;

  padding: 24px;
  height: 9.6rem;
  width: 100%;

  border-radius: 0.8rem 0.8rem 0 0;

  > div.block_info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    h2.block_title {
      font-size: 1.8rem;
    }

    span.block_classes_count {
      font-size: 1.4rem;
      margin-top: 0.6rem;
      color: ${FONTS_COLORS.SECONDARY};
    }
  }

  > svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

type BlockAndClassesType = {
  selectedBlock: boolean;
}

export const ClassesContainer = styled.div<BlockAndClassesType>`
  transition: height 0.3s ease 0s;

  height: 0;

  overflow: hidden;

  > ul.classes {
    padding: 24px;

    li:not(:first-child) {
      margin-top: 1.6rem;
    }
  }

  ${props => props.selectedBlock && css`
    height: auto;
    overflow: visible;
  `};
`;

type ClasseType = {
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export const Classe = styled.button<ClasseType>`
  display: flex;
  align-items: center;

  color: ${FONTS_COLORS.SECONDARY};

  ${props => props.isCompleted && css`
    color: ${COLORS.TERTIARY};
  `}

  ${props => props.isCurrent && css`
    color: ${FONTS_COLORS.PRIMARY};
    font-weight: bold;
  `}
`;