import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  gap: 18px;

  width: 100%;
  margin: 64px;
`;

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 380px;
  padding: 32px;
  height: min-content;

  background: var(--second-background);
  border-radius: 8px;

  h1 {
    font-size: 36px;
  }

  form {
    margin-top: 64px;
    width: 100%;

    > button {
      max-width: 200px;
      width: 100%;
    }
  }

  .trail_inputs {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
  }
`;

export const AllTrailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  flex: 1;
  width: 100%;

  background: var(--second-background);
  border-radius: 8px;

  padding: 32px;

  h1 {
    font-size: 36px;
  }
`;

export const Trails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 24px;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

export const Trail = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #262832;
  margin-right: 16px;
  padding: 16px;
  border-radius: 8px;
  
  &:not(:first-child) {
    margin-top: 16px;
  }

  > div.trail_container {
    max-width: 90%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
      width: 86px;
      height: 86px;
      margin-right: 12px;
      border-radius: 8px;
    }

    div {
      h3 {
        margin-bottom: 8px;
      }
      p {
        word-break: break-all;
        color: #c4c4c4;
      }
    }
  }

  > svg {
    flex: 1;
    width: 36px;
    height: 36px;
    
    path {
      color: #c4c4c4;
    }
  }
`;