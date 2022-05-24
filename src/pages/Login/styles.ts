import styled from 'styled-components';

import { Form } from '@unform/web';
import { BACKGROUND, COLORS, FONTS_COLORS, SHADOW_COLORS } from '../../theme';

export const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: calc(100% - 61px);
  margin-top: 61px;

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
    span {
      color: ${COLORS.PRIMARY};
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
      box-shadow: 0 15px ${BACKGROUND.SECONDARY}, 4px 4px 10px ${SHADOW_COLORS.BLACK_OPACITY_50};
    }

    a {
      border-top-right-radius: 0.8rem;
      background: linear-gradient(to right, ${BACKGROUND.PRIMARY}, ${BACKGROUND.SECONDARY}) !important;
    }
  }

  section {
    padding: 3.2rem;

    h1 {
      margin-bottom: 2.4rem;
    }
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 46.0rem;
  height: 650px;

  border-radius: 0.8rem;
  background: ${BACKGROUND.SECONDARY};
`


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