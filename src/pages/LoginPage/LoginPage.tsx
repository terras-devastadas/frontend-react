import { useState } from "react";
import { Form, Button, Container, Toast } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./LoginPage.module.css"; // Estilos personalizados
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/AuthService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false); // Para controlar a visibilidade do Toast

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Todos os campos são obrigatórios.");
      setShowToast(true); // Exibe o Toast
      return;
    }

    setError(""); // Limpa o erro

    try {
      const response = await AuthService.login(username, password);
      console.log(response.data);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
      setShowToast(true);
    }
  };

  return (
    <div className={styles.page}>
      <Container fluid className={styles.container}>
        <h2 className={styles.title}>Login</h2>

        {/* Toast para exibir erros */}
        {error && showToast && (
          <Toast className={styles.toast} onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className={`mb-3 ${styles.passwordGroup}`} controlId="formUsername">
            <Form.Label>Nome de Usuário</Form.Label>
            <Form.Control type="text" placeholder="Digite seu nome de usuário" name="username" value={formData.username} onChange={handleChange} />
          </Form.Group>
          <Form.Group className={`mb-1 ${styles.passwordGroup}`} controlId="formPassword">
            <Form.Label>Senha</Form.Label>
            <div className={styles.passwordContainer}>
              <Form.Control type={showPassword ? "text" : "password"} placeholder="Digite sua senha" name="password" value={formData.password} onChange={handleChange} />
              <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </Form.Group>
          <div className="text-end">
            <Button
              variant="link"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Esqueci a Senha
            </Button>
          </div>
          <div className="d-flex justify-content-center row ps-5 pe-5">
            <Button variant="primary" type="submit" className="mt-3">
              Entrar
            </Button>

            <Button
              variant="link"
              className="mt-3"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Não possui uma conta? Cadastre-se
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
