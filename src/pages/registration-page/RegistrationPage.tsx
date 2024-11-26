import {useRef} from 'react';
import InputField from "../../components/input-field/InputField";
import api from "../../services/api"
import "./StyleRegistrationPage.css";


const RegistrationPage = () => {

    const inputName = useRef<HTMLInputElement>(null);
    const inputLastName = useRef<HTMLInputElement>(null);
    const inputNickName = useRef<HTMLInputElement>(null);
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputPassword = useRef<HTMLInputElement>(null);

    //Verificar jeito seguro de passar a senha para o server
    //Verrificar se current? está correto
    async function registerUsers(){
        await api.post('/usuarios', {
            name: inputName.current?.value,
            lastName: inputLastName.current?.value,
            nickName: inputNickName.current?.value,
            email: inputEmail.current?.value,
            password: inputPassword.current?.value
        })
    }

    return(
        <div className="registration-form">
            <h2 className="registration-title">CADASTRO</h2>
            <InputField htmlFor="name" label="Nome:" ref={inputName} required></InputField>
            <InputField htmlFor="lastName" label="Sobrenome:" ref={inputLastName}></InputField>
            <InputField htmlFor="nickname" label="Apelido:" ref={inputNickName}></InputField>
            <InputField type="email" htmlFor="email" label="E-mail institucional:" ref={inputEmail}></InputField>
            <InputField type="password" htmlFor="password" label="Senha:" ref={inputPassword}></InputField>
            <button type="submit" className="registration-button" onClick={registerUsers}>Criar Conta</button>
        </div>
    )
}

export default RegistrationPage