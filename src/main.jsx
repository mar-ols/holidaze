import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "./styles/theme.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <GlobalStyle />
      <App />
    </Theme>
  </StrictMode>
);
