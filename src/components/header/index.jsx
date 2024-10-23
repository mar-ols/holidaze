import { useState } from "react";
import { Nav } from "../nav";
import { StyledSearchBar } from "../../styles/styled-components/search/searchbar";
import { ThemedButton } from "../../styles/styled-components/buttons";
import Logo from "../../assets/images/logo-white.png";
import Menu from "../../assets/icons/menu.png";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
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

  return (
    <>
      <header className="bg-primary text-secondary">
        <div className="d-sm-flex justify-content-between">
          <div className="text-center">
            <img src={Logo} alt="Holidaze logo" className="mt-3 mt-md-4 ms-3" />
          </div>
          <div className="text-center d-sm-flex justify-content-around align-items-center me-2 mt-2 mt-sm-5">
            <ThemedButton onClick={handleShowLogin}>Log in</ThemedButton>
            <ThemedButton onClick={handleShowRegister}>Register</ThemedButton>
            <StyledSearchBar
              className="d-block"
              placeholder="Search.."
              aria-label="search site"
            />
          </div>
        </div>
        <section>
          <img
            src={Menu}
            alt="Hamburger menu"
            id="menu"
            className="mx-2"
            onClick={handleShowNav}
          />
        </section>
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
        <Modal show={showLogin} onHide={handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <p onClick={handleCloseLogin}>Close</p>
          </Modal.Footer>
        </Modal>
        <Modal show={showRegister} onHide={handleCloseRegister}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <p onClick={handleCloseRegister}>Close</p>
          </Modal.Footer>
        </Modal>
      </header>
    </>
  );
}

export { Header };
