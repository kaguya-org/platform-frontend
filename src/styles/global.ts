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
    --second-background: #16171C;
    --third-background: #1B1D24;

    --primary-font-color: #fff;

    --shadow-black-color: rgba(0, 0, 0, 0.38);

    --primary-font: 'Open Sans', sans-serif;
    --second-font: 'Roboto Condensed', sans-serif;
  }

  body, html, #root {
    width: 100%;
    height: 100%;
    position: relative;

    background: var(--primary-background);
  }
`;
