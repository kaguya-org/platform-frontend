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
  padding: 32px;
  
  flex: 1;
  width: 100%;

  background: var(--second-background);
  border-radius: 8px;

`;

export const Trails = styled.div`
  display: flex;
  flex-direction: column;

`;

export const Trail = styled.div`
  display: flex;
  
  > div.trail_container {

    div {
      p {
        word-break: break-all;
      }
    }
  }
`;