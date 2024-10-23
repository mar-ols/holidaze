import { Button } from "react-bootstrap";
import styled from "styled-components";

const ThemedButton = styled(Button)`
  background-color: ${(props) => props.theme.color.primary};
  min-width: 80px;

  &:hover {
    color: #fff;
  }
`;

const CtaButton = styled(Button)`
  background-color: ${(props) => props.theme.color.info};
  min-width: 80px;
  color: #000;
  border: none;
  padding: 0.6rem 1.5rem;

  &:hover {
    background-color: #ffe34b;
    color: #000;
  }
`;

export { ThemedButton, CtaButton };
