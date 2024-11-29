import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar expand="sm" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/" className={styles["navbar-brand"]}>
          <img alt="" src="src/assets/react.svg" width="30" height="30" className="d-inline-block align-top" /> LaSagne
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={styles["nav-link"]}>
              Home
            </Nav.Link>
            <Nav.Link href="/login" className={styles["nav-link"]}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
