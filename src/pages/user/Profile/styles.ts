import styled from 'styled-components';

import { Form } from '@unform/web';
import { BACKGROUND } from '../../../theme';

export const Container = styled.div`
  margin: 64px 32px 0;
`;

export const Content = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 460px;

  border-radius: 0.8rem;
  background: ${BACKGROUND.SECONDARY};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 32px 32px 0 32px;

    a {
      font-size: 16px;
      color: #c4c4c4;
      transition: all 0.3s;

      &:hover {
        color: var(--second-color);
      }
    }
  }

  section {
    padding: 32px;
    display: flex;
    flex-direction: column;
  }
`

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  margin: 0 auto 32px;

  width: 150px;
  height: 150px;

  .avatarInput {
    width: max-content;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 50%;
    position: relative;
    transition: all 0.3s;

    &:hover {
      background: #000;
      opacity: 0.6;
    }

    label {
      cursor: pointer;

      input {
        z-index: 10;
        width: 100%;
        height: 100%;

        display: none;

        position: absolute;
      }
    }
  }
`

export const FormTag = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;

  .inputs {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  > button {
    max-width: 20.0rem;
    width: 100%;
  }
`;