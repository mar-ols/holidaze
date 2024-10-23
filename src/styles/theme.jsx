import { ThemeProvider } from "styled-components";

/* eslint-disable react/prop-types */

const theme = {
  color: {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    complimentary: "var(--color-complimentary)",
    info: "var(--color-info)",
    danger: "var(--color-danger)",
  },
};

export const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
