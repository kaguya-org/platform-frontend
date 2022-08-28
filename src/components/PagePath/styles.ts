import styled from 'styled-components';
import { COLORS, FONTS_COLORS, GLOBAL_COLORS } from '../../theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: 1.6rem;

  .previous_pages {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      &:not(:first-child) {
        margin-left: 0.8rem;
      }

      a, button {
        color: ${FONTS_COLORS.SECONDARY};

        &:hover {
          text-decoration: underline;
        }
      }

      svg {
        width: 1.8rem;
        height: 1.8rem;
        
        path {
          color: ${GLOBAL_COLORS.GRAY};
        }
      }
    }
  }

  .current_page {
    margin-left: 0.8rem;
    color: ${COLORS.PRIMARY};
    white-space: nowrap;
    max-width: max(200px, min(800px, 50vw));
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;