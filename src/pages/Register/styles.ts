import { Form } from '@unform/web';
import styled from 'styled-components';
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
      border-bottom: 0.2rem solid ${COLORS.PRIMARY};
      border-right: 0.2rem solid ${COLORS.PRIMARY};
      border-radius: 0.8rem;
      background: ${BACKGROUND.TERTIARY};
    }
  }

  section {
    padding: 3.2rem;

    h1 {
      font-size: 2.4rem;
      margin-bottom: 2.4rem;
    }
  }
`;

export const FormTag = styled(Form)`
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  > button {
    max-width: 20.0rem;
    width: 100%;
  }
`;