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

  background: var(--second-background);
  border-radius: 8px;

  h1 {
    font-size: 36px;
  }

  form {
    margin-top: 64px;
    width: 100%;

    > button {
      background: #242731;

      max-width: 200px;
      width: 100%;
      padding: 12px 28px;
      border-radius: 6px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: -2px 2px 0 var(--third-color);

      font-size: 14px;
      letter-spacing: 0.9px;

      transition: all 0.2s;
      &:hover {
        filter: brightness(110%);
      }
      svg {
        width: 22px;
        height: 22px;
      }
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

  padding-bottom: 32px;

  h1 {
    font-size: 36px;
    padding: 32px 0 0 32px;
  }
`;

export const Trails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  overflow: auto;

  padding: 0 16px 0 32px;
`;

export const Trail = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #262832;
  padding: 16px;
  border-radius: 8px;

  cursor: pointer;
  
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