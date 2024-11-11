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
  border: 1px solid ${(props) => props.theme.color.info};
  min-width: 80px;
  color: #000;
  padding: 0.6rem 1.5rem;

  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid ${(props) => props.theme.color.info};
  }
`;

const DangerButton = styled(CtaButton)`
  background-color: ${(props) => props.theme.color.danger};
  color: #fff;
  border: 1px solid ${(props) => props.theme.color.danger};

  &:hover {
    background-color: #fff;
    color: ${(props) => props.theme.color.danger};
    border: 1px solid ${(props) => props.theme.color.danger};
  }
`;

export { ThemedButton, CtaButton, DangerButton };
