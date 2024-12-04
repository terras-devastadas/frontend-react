import React, { useState, useEffect, useRef } from 'react';
import lasagneLogo from '../assets/lasagneLogo.png';
import visible from '../assets/visible.png';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import InputField from '../components/input-field/InputField';
import axios from 'axios';

function LoginPage() {

  const inputUsername = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Função para fazer login
  async function handleLogin() {
    const username = inputUsername.current?.value;
    const email = inputEmail.current?.value;
    const password = inputPassword.current?.value;

    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await api.post('/accounts/login/', {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        // Redireciona para a página do usuário ou dashboard após login bem-sucedido
        navigate('/');
      } else {
        setErrorMessage('Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro de login:', error);
      setErrorMessage('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginPage}>
      <header className={styles.headerBar}>
        <img className={styles.logoLasagne} src={lasagneLogo} alt="Lasagne Logo" />
        <span>LaSagne</span>
      </header>

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
            className={styles.email}
            htmlFor="email"
            label="Email"
            ref={inputEmail}
            required
          />
          <InputField
            className={styles.senha}
            type={passwordVisible ? 'text' : 'password'}
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
              style={{ cursor: 'pointer' }}
            />
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <div className={styles.footer}>
            <Link to="/registration">
              <span className={styles.cadastro}>Não possui conta? Cadastre-se!</span>
            </Link>
            <button onClick={handleLogin} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
