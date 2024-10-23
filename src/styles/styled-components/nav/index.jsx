import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.color.secondary};
  text-decoration: none;
  padding: 0.7rem 0;
  border-bottom: 1px solid ${(props) => props.theme.color.secondary};

  &.active {
    color: ${(props) => props.theme.color.info};
  }

  &:hover {
    color: #ffe34b;
  }
`;

export { StyledNavLink };
