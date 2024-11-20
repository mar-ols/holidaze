import { useState, useEffect } from "react";
import { useFetch } from "../api/constant";
import { useNavigate } from "react-router-dom";
import { StyledSearchBar } from "../../styles/styled-components/search/searchbar";
import { Link } from "react-router-dom";
import { StyledNavLink } from "../../styles/styled-components/nav";
import { VenuesProductCard } from "../product-cards/venues";
import { ThemedButton } from "../../styles/styled-components/buttons";
import { StyledModal } from "../../styles/styled-components/forms";
import { RegisterForm } from "../forms/register";
import { LoginForm } from "../forms/login";
import { Loader } from "../user-messages/loader";
import Logo from "../../assets/images/logo-white.png";
import Menu from "../../assets/icons/menu.png";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  const { data, isLoading, isError, fetchData } = useFetch(
    "https://v2.api.noroff.dev/holidaze/venues"
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const storageUser = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  useEffect(() => {
    if (storageUser) {
      setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (data) {
        const filtered = data.data.filter((venue) =>
          venue.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredVenues(filtered);
        setShowSearchModal(true);
      }
    }
  };

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const [showNav, setShowNav] = useState(false);
  const handleCloseNav = () => setShowNav(false);
  const handleShowNav = () => setShowNav(true);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    handleCloseLogin();
    handleCloseRegister();
  };

  return (
    <>
      <header className="bg-primary text-secondary">
        <div className="d-sm-flex justify-content-between">
          <div className="text-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Holidaze logo"
                className="mt-3 mt-md-4 ms-3"
              />
            </Link>
          </div>
          <div className="text-center d-sm-flex justify-content-around align-items-center me-2 mt-2 mt-sm-5">
            <p id="logged-user" className="m-0">
              {isLoggedIn ? `${storageUser.data.name}` : ""}
            </p>
            {isLoggedIn ? (
              <ThemedButton id="logout" onClick={handleLogout}>
                Logout
              </ThemedButton>
            ) : (
              <>
                <ThemedButton onClick={handleShowLogin} id="login">
                  Log in
                </ThemedButton>
                <ThemedButton
                  onClick={handleShowRegister}
                  id="register"
                  className="me-sm-3"
                >
                  Register
                </ThemedButton>
              </>
            )}
            <StyledSearchBar
              className="d-block"
              placeholder="Search.."
              aria-label="search site"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>
        </div>
        <img
          src={Menu}
          alt="Hamburger menu"
          id="menu"
          className="mx-2"
          onClick={handleShowNav}
        />
        <Offcanvas
          show={showNav}
          onHide={handleCloseNav}
          className="bg-primary"
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <nav>
              <StyledNavLink
                to="/"
                className="nav-link"
                onClick={handleCloseNav}
              >
                Home
              </StyledNavLink>
              <StyledNavLink
                to="/venues"
                className=" nav-link"
                onClick={handleCloseNav}
              >
                Venues
              </StyledNavLink>
              {isLoggedIn ? (
                <StyledNavLink
                  to="/profile"
                  className="nav-link"
                  onClick={handleCloseNav}
                >
                  Profile
                </StyledNavLink>
              ) : (
                ""
              )}
              <StyledNavLink
                to="/about"
                className="nav-link"
                onClick={handleCloseNav}
              >
                About
              </StyledNavLink>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
        <StyledModal show={showLogin} onHide={handleCloseLogin}>
          <Modal.Header closeButton />
          <Modal.Title>Log in</Modal.Title>
          <Modal.Body>
            <LoginForm onSuccess={handleAuthSuccess} />
          </Modal.Body>
        </StyledModal>
        <StyledModal show={showRegister} onHide={handleCloseRegister}>
          <Modal.Header closeButton />
          <Modal.Title>Register</Modal.Title>
          <Modal.Body>
            <RegisterForm onSuccess={handleAuthSuccess} />
          </Modal.Body>
        </StyledModal>
        <StyledModal
          show={showSearchModal}
          onHide={() => setShowSearchModal(false)}
        >
          <Modal.Header closeButton />
          <Modal.Title>Search Results</Modal.Title>
          <Modal.Body>
            {isLoading && (
              <div>
                <Loader />
              </div>
            )}
            {isError && <p className="error">{isError}</p>}
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <VenuesProductCard
                  key={venue.id}
                  id={venue.id}
                  title={venue.name}
                  image={venue.media[0]?.url || null}
                  price={venue.price}
                  maxGuests={venue.maxGuests}
                />
              ))
            ) : (
              <p>No venues match your search criteria.</p>
            )}
          </Modal.Body>
        </StyledModal>
      </header>
    </>
  );
}

export { Header };
