import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_COLORS } from '../../../theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  margin: 64px auto;
  max-width: 1300px;

  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  margin-top: 40px;
  display: flex;
  width: 100%;
  gap: 16px;
`;

export const CurrentLessonContainer = styled.main`
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

  background: #16171c;
  border-radius: 4px;

  iframe {
    border-radius: 4px;
    border: none;
    width: max(280px, min(850px, 50vw));
    height: max(158.48px, min(478.125px, 28.3vw));
  }



  > div.lesson_counts_container {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 30px 16px;

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

  background: #16171c;
  border-radius: 4px;
`;

export const BlocksAndLessonsContainer = styled.aside`
  background: #16171c;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 400px;

  border-radius: 4px;
`;

export const BlockAndLessons = styled.div`
  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const Block = styled.button`
  display: flex;
  position: relative;
  z-index: 10;
  align-items: center;
  justify-content: space-between;
  background: #1a1b22;

  padding: 24px;

  height: 96px;
  width: 100%;

  border-radius: 4px;

  > div.block_info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    .block_title {
      font-size: 1.8rem;
      text-align: left;
      font-weight: normal;

      &.selected {
        font-weight: bold;
      }
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
  height: number;
}

export const LessonsContainer = styled.div<BlockAndLessonsType>`
  transition: height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

  height: 0;

  overflow: hidden;

  > ul.lessons {
    padding: 24px;

    li:not(:first-child) {
      margin-top: 16px;
    }
  }

  ${props => props.selectedBlock && css`
    height: ${props.height}px;
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
  
export const News = styled.section`
  margin-top: 70px;
  text-align: center;
  border-radius: 4px;
  padding: 0 40px;
  border: 2px solid #c9346440;
  cursor: not-allowed;
  h1 {
    font-size: 3rem;
    color: #c93464 !important;
  }

`