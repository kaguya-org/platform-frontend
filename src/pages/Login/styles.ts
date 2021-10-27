import styled from 'styled-components';

import { Form } from '@unform/web';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;

  max-width: 460px;
  width: 100%;
  height: min-content;
  margin: 0 auto;

  border-radius: 8px;
  background: var(--second-background);

  > div:first-child {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a, span {
      text-align: center;
      width: 100%;
      padding: 16px;
    }

    a {
      color: var(--second-color);
      border-bottom: 2px solid var(--second-color);
      border-left: 2px solid var(--second-color);
      border-radius: 8px;
      background: var(--third-background);
    }
  }

  section {
    padding: 32px;

    h1 {
      font-size: 24px;
      margin-bottom: 24px;
    }
  }
`;

export const FormTag = styled(Form)`
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;

    span.forgot_password {
      color: #c4c4c4;
      font-size: 14px;

      margin: 8px 0 24px;

      button {
        color: #c4c4c4;
        font-size: 14px;
        margin-left: 2px;

        text-decoration: underline;
        transition: all 0.2s;

        &:hover {
          color: var(--second-color);
        }
      }
    }
  }

  > button {
    max-width: 200px;
    width: 100%;
  }
`;