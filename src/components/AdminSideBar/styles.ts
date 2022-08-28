import styled from 'styled-components';

export const Container = styled.header`
  height: 100%;

  display: flex;
  align-items: center;
`;

export const Content = styled.section`
  svg {
    color: #f9f9f9;
  }

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  max-width: 300px;
  width: 100%;
  height: 100%;

  background: var(--second-background);
  border-radius: 0 12px 12px 0;

  ul li {
    cursor: pointer;
  }

  nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    width: 100%;

    div {
      margin-top: 16px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 24px;
      flex-direction: row;
      gap: 16px;

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }

      h1 {
        color: #fff;
        font-size: 14px;
      }
    }

    ul {
      margin-top: 64px;
      width: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;

      a {
        color: #9a9ea3;
        padding: 16px 20px;
        border-radius: 8px 0 0 8px;

        display: flex;
        align-items: center;
        gap: 16px;

        transition: background 0.3s;

        &:hover {
          background: var(--primary-background);

          svg path {
            color: var(--third-color);
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    ul {
      margin-bottom: 16px;
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: column;

      a {
        padding: 16px 20px;
        display: flex;
        align-items: center;
        color: #9a9ea3;
        gap: 16px;

        transition: color 0.3s;

        &:hover {
          svg path {
            color: var(--third-color);
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    span {
      padding: 16px 0;
      border-radius: 8px 8px 0 0;

      background: var(--third-color);
      width: 100%;

      display: flex;
      align-items: center;
      gap: 12px;

      p {
        text-overflow: ellipsis;
        color: #9a9ea3;
        width: 70%;
        padding-right: 12px;
        white-space: nowrap;
        overflow: hidden;
      }

      img {
        margin-left: 14px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
  }
`;
