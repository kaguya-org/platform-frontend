import styled from 'styled-components';

import { Form } from '@unform/web';
import { BACKGROUND, COLORS, FONTS_COLORS } from '../../theme';

export const Content = styled.main`
  display: flex;
  flex-direction: column;

  max-width: 46.0rem;
  width: 100%;
  height: min-content;
  margin: 0 auto;

  border-radius: 0.8rem;
  background: ${BACKGROUND.SECONDARY};

  nav.login_register_navigation {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a, span {
      text-align: center;
      width: 100%;
      padding: 1.6rem;

      font-size: 1.6rem;
    }

    a {
      color: ${COLORS.PRIMARY};
      border-bottom: 2px solid ${COLORS.PRIMARY};
      border-left: 2px solid ${COLORS.PRIMARY};
      border-radius: 0.8rem;
      background: ${BACKGROUND.TERTIARY};
    }
  }

  section {
    padding: 3.2rem;

    h1 {
      margin-bottom: 2.4rem;
    }
  }
`;

export const FormTag = styled(Form)`
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;

    span.forgot_password {
      color: ${FONTS_COLORS.SECONDARY};
      font-size: 1.4rem;

      margin: 0.8rem 0 2.4rem;

      button {
        color: ${FONTS_COLORS.SECONDARY};
        font-size: 1.4rem;
        margin-left: 0.2rem;

        text-decoration: underline;
        transition: all 0.2s;

        &:hover {
          color: ${COLORS.PRIMARY};
        }
      }
    }
  }

  > button {
    max-width: 20.0rem;
    width: 100%;
  }
`;