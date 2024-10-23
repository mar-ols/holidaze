import { StyledNavLink } from "../../styles/styled-components/nav";

/* eslint-disable react/prop-types */

function Nav({ handleCloseNav }) {
  return (
    <>
      <nav>
        <StyledNavLink to="/" className="nav-link" onClick={handleCloseNav}>
          Home
        </StyledNavLink>
        <StyledNavLink
          to="/venues"
          className=" nav-link"
          onClick={handleCloseNav}
        >
          Venues
        </StyledNavLink>
        <StyledNavLink
          to="/profile"
          className="nav-link"
          onClick={handleCloseNav}
        >
          Profile
        </StyledNavLink>
        <StyledNavLink
          to="/about"
          className="nav-link"
          onClick={handleCloseNav}
        >
          About
        </StyledNavLink>
      </nav>
    </>
  );
}

export { Nav };
