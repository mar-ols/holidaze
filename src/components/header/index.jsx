import { useState, useEffect } from "react";
import { useFetch } from "../api/constant";
import { Nav } from "../nav";
import { StyledSearchBar } from "../../styles/styled-components/search/searchbar";
import { ProductCard } from "../product-card";
import { ThemedButton } from "../../styles/styled-components/buttons";
import { StyledModal } from "../../styles/styled-components/forms";
import { RegisterForm } from "../forms/register";
import { LoginForm } from "../forms/login";
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

  // Log in modal
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  // Sign up modal
  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  // Sidebar nav
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
            <img src={Logo} alt="Holidaze logo" className="mt-3 mt-md-4 ms-3" />
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
            <Nav handleCloseNav={handleCloseNav} />
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
            {isLoading && <p>Loading venues...</p>}
            {isError && <p>Error: {isError}</p>}
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <ProductCard
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
