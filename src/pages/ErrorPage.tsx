import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container className="d-flex flex-column mt-5 justify-content-center align-items-center">
      <div className="text-center">
        <h1 style={{ fontSize: "6rem", color: "#FF6347" }}>Oops!</h1>
        <h2 style={{ color: "#555", fontSize: "2rem" }}>A página que você procurou não foi encontrada!</h2>
        <img src="https://media.giphy.com/media/3o85xGoY0hpwHjUOyw/giphy.gif" alt="Lost in space" style={{ width: "300px", borderRadius: "10px", marginBottom: "20px" }} />
        <div className="mt-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              Voltar para a Página Inicial
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
