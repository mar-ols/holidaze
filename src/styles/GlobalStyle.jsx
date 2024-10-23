import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    --color-primary: #375D61;
    --color-secondary: #FFF;
    --color-complimentary: #64A7AE;
    --color-info: #FFD700;
    --color-danger: #960D0D;

    font-family: "Palanquin";
      src: url("../assets/fonts/Palanquin-Regular.ttf") format("truetype");
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  body {
    height: 100%;
    margin: 0;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyle;
