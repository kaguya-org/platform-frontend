import styled from 'styled-components';
import { Input } from '../../../components/HtmlPartials/Input';

export const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  gap: 18px;
  height: min-content;

  width: 100%;
  margin: 64px;
`;

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 32px;
  max-width: 480px;

  background: var(--second-background);
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: 32px;
        margin-bottom: 16px;
      }

      button {
        &:hover {
          svg path {
            transition: all 0.2s;
            color: var(--third-color);
          }
        }

        svg {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
    }

    > aside {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      img {
        width: 120px;
        height: 120px;
        border-radius: 8px;
      }

      div.created_updated_values {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        span {
          color: #c4c4c4;
          font-size: 12px;
          letter-spacing: 0.9px;

          &:first-child {
            margin-bottom: 8px;
          }
        }
      }
    }

    > span.line {
      height: 2px;
      margin: 32px 0 0;
      background: black;
      background: 
        -webkit-gradient(linear, 0 0, 100% 0, 
        from(var(--second-background)), 
        to(var(--second-background)), 
        color-stop(50%, #353535));
    }

    > p {
      margin: 16px 0 32px;
      color: #c4c4c4;
    }

    div.control_buttons {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      gap: 8px;
      max-width: 350px;
      > button:first-child {
        background: #242731;
  
        width: 100%;
        padding: 12px 18px;
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

      > button:nth-child(2) {
        width: 100%;
        padding: 12px 28px;

        color: #f44;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        font-size: 14px;
        letter-spacing: 0.9px;

        transition: all 0.2s;
        border-bottom: 2px solid transparent;

        &:hover {
          border-bottom: 2px solid #f44;
        }
        
        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
`;

export const InputTrailName = styled(Input)`
  &.labelInput {
    background: none;
    padding: 0;

    border-bottom: 1px solid #353535;
    margin-bottom: 16px;
    border-radius: 0;

    input {
      font-size: 32px;
      font-weight: bold;

      font-family: var(--second-font);
    }
  }
`;

export const InputTrailDescription = styled(Input)`

margin: 16px 0 32px;

`;
