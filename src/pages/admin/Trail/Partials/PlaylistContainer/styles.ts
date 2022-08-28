import styled from 'styled-components';

export const PlaylistContainerStyled = styled.div`
display: flex;
align-items: center;  
justify-content: flex-start;
width: 100%;

> aside {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 90%;
  width: 100%;

  span {
    max-width: 48px;
    width: 100%;
    height: 48px;
    background: var(--third-background);
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 500;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      font-family: var(--second-font);
    }

    p {
      margin-top: 8px;
      word-break: break-word;
      color: #9a9ea3;
    }
  }
}

svg {
  max-width: 36px;
  width: 100%;
  height: 36px;
  
  path {
    color: #9a9ea3;
  }
}
`;