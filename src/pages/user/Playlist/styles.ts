import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BACKGROUND, COLORS, GLOBAL_COLORS, FONTS_COLORS } from '../../../theme';

export const Container = styled.div``;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;

  margin: 64px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

export const MainContent = styled.main`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const CurrentLessonContainer = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const CurrentLesson = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;

  width: 100%;

  background: ${BACKGROUND.SECONDARY};
  border-radius: 0.8rem;

  iframe {
    border-radius: 8px 8px 0 0;
    border: none;

    width: 830px;
    height: 470px;
  }

  > div.lesson_counts_container {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 16px;

    > span.views_count {
      font-size: 1.6rem;
    }

    > div.likes_dislikes {
      display: flex;
      align-items: center;
      gap: 24px;

      button {
        display: flex;
        align-items: center;
        gap: 8px;

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

        &.lesson_liked {
          svg path {
            color: ${COLORS.SECONDARY};
          }
        }

        &.lesson_disliked {
          svg path {
            color: ${COLORS.SECONDARY};
          }
        }
      }
    }
  }
`;

export const LessonInfo = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;

  padding: 32px;

  background: ${BACKGROUND.SECONDARY};
  border-radius: 8px;
`;

export const BlocksAndLessonsContainer = styled.aside`
  background: ${BACKGROUND.SECONDARY};

  display: flex;
  flex-direction: column;

  max-width: 360px;
  width: 100%;

  border-radius: 8px;
`;

export const BlockAndLessons = styled.div`
  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const Block = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #262832;

  padding: 24px;

  height: 96px;
  width: 100%;

  border-radius: 8px 8px 0 0;

  > div.block_info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    h2.block_title {
      font-size: 1.8rem;
    }

    span.block_lessons_count {
      font-size: 1.4rem;
      margin-top: 8px;
      color: ${FONTS_COLORS.SECONDARY};
    }
  }

  > svg {
    width: 24px;
    height: 24px;
  }
`;

type BlockAndLessonsType = {
  selectedBlock: boolean;
}

export const LessonsContainer = styled.div<BlockAndLessonsType>`
  transition: height 0.3s ease 0s;

  height: 0;

  overflow: hidden;

  > ul.lessons {
    padding: 24px;

    li:not(:first-child) {
      margin-top: 16px;
    }
  }

  ${props => props.selectedBlock && css`
    height: auto;
    overflow: visible;
  `};
`;

type LessonType = {
  isCompleted?: boolean;
  $isCurrent?: boolean;
}

export const Lesson = styled(Link)<LessonType>`
  display: flex;
  align-items: center;

  color: ${FONTS_COLORS.SECONDARY};

  font-size: 1.4rem;

  ${props => props.isCompleted && css`
    color: ${COLORS.TERNARY};
  `}

  ${props => props.$isCurrent && css`
    color: ${FONTS_COLORS.PRIMARY};
    font-weight: bold;
  `}
`;