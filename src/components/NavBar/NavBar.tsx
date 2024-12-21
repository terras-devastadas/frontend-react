import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "./NavBar.module.css";
import lasagneLogo from "../../assets/lasagneLogo.png";

const NavBar = () => {
  return (
    <Navbar expand="sm" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/" className={styles["navbar-brand"]}>
          <img
            alt=""
            src={lasagneLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <span>LaSagne</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "center" }}>
          <Nav className="">
            <Nav.Link href="/" className={styles["nav-link"]}>
              Home
            </Nav.Link>
            <Nav.Link href="/login" className={styles["nav-link"]}>
              Login
            </Nav.Link>
            <Nav.Link href="/perfil" className={styles["nav-link"]}>
              Perfil
            </Nav.Link>
            <Nav.Link href="/editar-perfil" className={styles["nav-link"]}>
              Editar Perfil
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
