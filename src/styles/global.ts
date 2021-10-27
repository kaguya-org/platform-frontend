import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    list-style: none;
    text-decoration: none;

    font-family: var(--primary-font);
    letter-spacing: 0.8px;

    color: var(--primary-font-color);
  }

  button {
    background: none;
		cursor: pointer;
    border: none;
  }

  a {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--second-font);
  }

  :root {
    --primary-color: #D1107A;
    --second-color: #FF69F9;
    --third-color: #2694E3;

    --dark-primary-color: #1F0212;
    --semi-dark-second-color: #3B0522;

    --primary-background: #0D0E12;
    --second-background: #181A21;
    --third-background: #1B1D24;

    --primary-font-color: #fff;

    --shadow-black-color: rgba(0, 0, 0, 0.38);

    --input-error-color: #c53030;

    --primary-font: 'Open Sans', sans-serif;
    --second-font: 'Roboto Condensed', sans-serif;
  }

  body, html, #root {
    width: 100%;
    height: 100%;
    position: relative;

    background: var(--primary-background);
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px #262832 inset !important;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: var(--primary-font-color) !important;
  }
`;
