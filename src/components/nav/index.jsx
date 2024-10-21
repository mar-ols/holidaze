import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/venues">Venues</NavLink>
        <NavLink to=":id">Venue</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </>
  );
}

export { Nav };
