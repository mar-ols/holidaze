import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    --color-primary: #2c5474;
    --color-secondary: #fff;
    --color-complimentary: #3b5668;
    --color-info: #FFD700;
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;}

  body {
    margin: 0;
  }
`;

export default GlobalStyle;
