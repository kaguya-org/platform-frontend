import { createGlobalStyle } from 'styled-components';
import { 
  FONTS_COLORS,
  FONTS,
  BACKGROUND,
  COLORS
} from '../theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    list-style: none;
    text-decoration: none;

    font-family: ${FONTS.PRIMARY}, sans-serif;
    letter-spacing: 0.8px;

    color: ${FONTS_COLORS.PRIMARY};
  }

  button {
    background: none;
		cursor: pointer;
    border: none;
  }

  a {
    cursor: pointer;
  }

  h1, h2 {
    font-size: 2.4rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${FONTS.SECONDARY};
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
    position: relative;

    font-size: 62.5%;

    background: ${BACKGROUND.PRIMARY};

    height: 100vh;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px #262832 inset !important;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: ${FONTS_COLORS.SECONDARY};
  }

  div.line_separator {
    width: 100%;
    height: 2px;
    background: 
      -webkit-gradient(linear, 0 0, 100% 0, 
      from(${BACKGROUND.SECONDARY}), 
      to(${BACKGROUND.SECONDARY}), 
      color-stop(50%, #353535));
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.QUATENARY}; 
    border-radius: 10px;

    transition: all 0.2s;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.PRIMARY};
  }
`;
