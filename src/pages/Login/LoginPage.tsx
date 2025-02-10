import { useState, useRef, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import api from "../../services/api";
import visible from "../../assets/visible.png";

function LoginPage() {
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   api.post("logout/").then((response) => {
  //     console.log(response);
  //   });
  // }, []);

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Função para fazer login
  async function handleLogin() {
    const username = inputUsername.current?.value;
    const password = inputPassword.current?.value;

    if (!username || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    sessionStorage.clear(); // Removendo Token e user

    try {
      const response = await api.post("/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        // Armazena o token primeiro
        sessionStorage.setItem("Token", response.data.token);
  
        // Agora a requisição de informações do usuário enviará o token
        const userResponse = await api.get("/info/");
        // Armazene as informações do usuário convertendo o objeto para string
        sessionStorage.setItem("User", JSON.stringify(userResponse.data));
        
        navigate("/");
        
      } else {
        setErrorMessage("Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro de login:", error);
      setErrorMessage("Ocorreu um erro ao tentar fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.bodyLogin}>
        <div className={styles.loginBox}>
          <h1 className={styles.titleLogin}>LOGIN</h1>
          <InputField
            className={styles.usuario}
            htmlFor="username"
            label="Usuário:"
            ref={inputUsername}
            required
          />
          <InputField
            className={styles.senha}
            type={passwordVisible ? "text" : "password"}
            htmlFor="password"
            label="Senha:"
            ref={inputPassword}
          />
          <div className={styles.passwordWrapper}>
            <img
              src={visible}
              alt="Toggle Password Visibility"
              className={styles.togglePassword}
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            />
          </div>

          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

          <div className={styles.footer}>
            <Link to="/registration">
              <span className={styles.cadastro}>Não possui conta? Cadastre-se!</span>
            </Link>
            <button onClick={handleLogin} disabled={loading} className={styles.submitButton}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
