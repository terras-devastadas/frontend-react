// src/components/NavBar.js
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./NavBar.module.css";
import lasagneLogo from "../../assets/lasagneLogo.png";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Função para lidar com a pesquisa
  const handleSearch = (e) => {
    e.preventDefault();
    // Redireciona para a página de busca passando o termo na URL
    navigate(`/search?query=${searchTerm}`);
  };

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
          />
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
            <Nav.Link href="/cadastro" className={styles["nav-link"]}>
              Cadastro
            </Nav.Link>
            <Nav.Link href="/perfil" className={styles["nav-link"]}>
              Perfil
            </Nav.Link>
            <Nav.Link href="/editar-perfil" className={styles["nav-link"]}>
              Editar Perfil
            </Nav.Link>
            <Nav.Link href="/criar-comunidade" className={styles["nav-link"]}>
              Criar comunidade
            </Nav.Link>
            <Nav.Link href="/criar-comunidade-professor" className={styles["nav-link"]}>
              Criar comunidade professor
            </Nav.Link>
            <Nav.Link href="/criar-post" className={styles["nav-link"]}>
              Criar post
            </Nav.Link>
          </Nav>

          {/* Barra de Pesquisa */}
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles["search-bar"]}
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
