import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-secondary d-flex flex-column py-4 ps-4">
      <p>
        <Link to="/" className="link-secondary text-decoration-none">
          Home
        </Link>
      </p>
      <p>
        <Link to="/venues" className="link-secondary text-decoration-none">
          Venues
        </Link>
      </p>
      <p>
        <Link to="/about" className="link-secondary text-decoration-none">
          About
        </Link>
      </p>
      <p className="my-3">©Holidaze</p>
    </footer>
  );
}

export { Footer };
