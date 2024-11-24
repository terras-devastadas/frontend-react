import React, { useState } from 'react';
import lasagneLogo from '../assets/lasagneLogo.png';
import visible from '../assets/visible.png';
import styles from './LoginPage.module.css';

function LoginPage() {

  //Função pra revelar ou ocultar a senha baseado em True or False
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  //Botão de entrar, por enquanto só pra ele ter uma função
  function clickedLogin() {
    console.log("olá mundo");
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
          <span className={styles.user}>Username:</span>
          <input
            id="username"
            className={styles.usuario}
            type="text"
            name="Username"
            size="40"
          />
          <span className={styles.pass}>Senha:</span>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              className={styles.senha}
              type={passwordVisible ? "text" : "password"}
              name="Senha"
              size="40"
            />
            <img
              src={visible}
              alt="Toggle Password Visibility"
              className={styles.togglePassword}
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className={styles.footer}>
            <span className={styles.cadastro}>Não possui conta? Cadastre-se!</span>
            <button onClick={clickedLogin}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
