import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-secondary d-flex flex-column py-4 ps-4">
      <Link to="/" className="link-secondary text-decoration-none">
        Home
      </Link>
      <Link to="/venues" className="link-secondary text-decoration-none">
        Venues
      </Link>
      <Link to="/about" className="link-secondary text-decoration-none">
        About
      </Link>
      <p className="my-3">©Holidaze</p>
    </footer>
  );
}

export { Footer };
