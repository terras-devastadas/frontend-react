//import {useState} from 'react';
import InputField from "../../components/input-field/InputField";
import "./StyleRegistrationPage.css";


const RegistrationPage = () => {
    return(
        <div className="registration-form">
            <h2 className="registration-title">CADASTRO</h2>
            <InputField htmlFor="name" label="Nome:"></InputField>
            <InputField htmlFor="lastName" label="Sobrenome:"></InputField>
            <InputField htmlFor="nickname" label="Apelido:"></InputField>
            <InputField type="email" htmlFor="email" label="E-mail institucional:" ></InputField>
            <InputField type="password" htmlFor="password" label="Senha:" ></InputField>
            <button type="submit" className="registration-button">Criar Conta</button>
        </div>
    )
}

export default RegistrationPage