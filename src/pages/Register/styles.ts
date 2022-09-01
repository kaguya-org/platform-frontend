import { Form } from '@unform/web';
import styled from 'styled-components';
import { BACKGROUND, COLORS, SHADOW_COLORS } from '../../theme';

export const Container = styled.div`
`;

export const Content = styled.main`
  width: 100%;
  height: calc(100% - 82px);
  margin-top: 128px;

  display: flex;
  align-items: center;
  justify-content: center;

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
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
      color: ${COLORS.PRIMARY};
      box-shadow: 0 15px ${BACKGROUND.SECONDARY}, -4px 4px 10px ${SHADOW_COLORS.BLACK_OPACITY_50};
    }

    a {
      border-top-left-radius: 0.8rem;
      background: linear-gradient(to left, ${BACKGROUND.PRIMARY}, ${BACKGROUND.SECONDARY}) !important;
    }
  }

  section {
    padding: max(16px, min(27px, 2vw));
    padding-top: 50px;
    padding-bottom: 50px;

    h1 {
      font-size: 2.4rem;
      margin-bottom: 2.4rem;
    }
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 46.0rem;
  height: 650px;
  margin: 0 auto;
  border-radius: 0.8rem;
  background: ${BACKGROUND.SECONDARY};
`

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