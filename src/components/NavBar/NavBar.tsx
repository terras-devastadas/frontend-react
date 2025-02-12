import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./NavBar.module.css";
import lasagneLogo from "../../assets/lasagneLogo.png";
import CommunityIcon from "../../assets/CommunityIcon.png";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Função para atualizar a URL de pesquisa em tempo real
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Redireciona para a página de busca com o termo atual
    navigate(`/search?query=${term}`);
  };

  // Função para evitar o comportamento padrão do formulário ao pressionar "Enter"
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    navigate(`/search?query=${searchTerm}`); // Garante que a URL seja atualizada
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
          <Form className="d-flex" onSubmit={handleFormSubmit}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearchChange} // Atualiza a URL em tempo real
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