import styled from 'styled-components';

export const Container = styled.label`
  &.labelInput {
    background: #262832;
    position: relative;
    padding: 16px;
    cursor: text;
    border-radius: 8px;

    &:not(:first-child) {
      margin-top: 12px;
    }

    &:last-child {
      margin-bottom: 22px;
    }

    input, textarea {
      font-size: 14px;
      padding-top: 6px;
      width: 100%;

      background: none;
      border: none;
      border-radius: 8px;
      outline: none;
      
      letter-spacing: 0.7px;
    }
      
    input {
    }
      
    textarea {
      height: 100px;
      appearance: none;
      resize: none;
    }

    input + span,
    textarea + span {
      position: absolute;
      top: 18px;
      left: 0;
      transition: all 0.2s;
      color: #c4c4c4;

      padding-left: 16px;
      font-size: 14px;
    }

    input:focus + span,
    input:not(:placeholder-shown) + span,
    textarea:focus + span,
    textarea:not(:placeholder-shown) + span {
      top: 2px;
      font-size: 12px;
    }
  }
`;