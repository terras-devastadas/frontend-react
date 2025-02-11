import { useRef } from "react";
import InputField from "../../components/InputField/InputField";
import api from "../../services/api";
import "./StyleRegistrationPage.css";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const navigate = useNavigate();
    
  const inputName = useRef<HTMLInputElement>(null);
  const inputLastName = useRef<HTMLInputElement>(null);
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword1 = useRef<HTMLInputElement>(null);
  const inputPassword2 = useRef<HTMLInputElement>(null);

  //Verificar jeito seguro de passar a senha para o server
  //Verrificar se current? está correto
  async function registerUsers() {
    if (inputPassword1.current?.value !== inputPassword2.current?.value) {
      console.error("Senhas devem ser diferentes");
      return;
    }
    sessionStorage.clear();

    await api.post("/users/", {
      first_name: inputName.current?.value,
      last_name: inputLastName.current?.value,
      username: inputUsername.current?.value,
      email: inputEmail.current?.value,
      password: inputPassword1.current?.value,
    }).then(() => {
        navigate('/login')
    });
  }

  return (
    <div className="registration-form">
      <h2 className="registration-title">CADASTRO</h2>
      <InputField htmlFor="name" label="Nome:" ref={inputName} required></InputField>
      <InputField htmlFor="lastName" label="Sobrenome:" ref={inputLastName}></InputField>
      <InputField htmlFor="username" label="Apelido:" ref={inputUsername}></InputField>
      <InputField type="email" htmlFor="email" label="E-mail institucional:" ref={inputEmail}></InputField>
      <InputField type="password" htmlFor="password" label="Crie uma senha:" ref={inputPassword1}></InputField>
      <InputField type="password" htmlFor="password" label="Confirme sua senha:" ref={inputPassword2}></InputField>
      <button type="submit" className="registration-button" onClick={registerUsers}>
        Criar Conta
      </button>
    </div>
  );
};

export default RegistrationPage;
