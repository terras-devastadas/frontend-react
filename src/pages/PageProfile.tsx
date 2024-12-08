import React, { useState } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/joia.png";
import { Button, Profile } from "../components/CustomProfile";
import '../components/CustomProfile.css';
// Crie este arquivo para estilizações específicas

const PageProfile: React.FC = () => {
  const handleDeleteAccount = () => {
    // Lógica para excluir a conta do usuário
    alert("Conta excluída!");
  };

  const handleUpdateProfile = (
    updatedProfile: Partial<typeof initialProfile>
  ) => {
    // Lógica para atualizar o perfil do usuário
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedProfile,
    }));
    alert("Perfil atualizado!");
  };

  const handleUpdateAvatar = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        avatarUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const initialProfile = {
    name: "Jane Patrick",
    email: "jane.patrick@aluno.unb.br",
    bio: "Ele mesmo",
    avatarUrl: userIcon,
  };

  const [UserProfile, setUserProfile] = useState(initialProfile);

  return (
    <div className="caixa">
      <div className="nav-bar">
        <img src={logo} alt="Logo" className="lasagner" />
        <div className="logo-texto">LaSagne</div>
      </div>
      <div className="l-side"></div>
      <div className="caixa-content">
        <div className="content">
          <h2 className="content-texto">Configurações de perfil:</h2>
          <div className="user-section">
            {/* <Profile {...UserProfile} /> */}
            <Profile
              name={UserProfile.name}
              email={UserProfile.email}
              bio={UserProfile.bio}
              avatarUrl={UserProfile.avatarUrl}
              onUpdateProfile={handleUpdateProfile}
              onUpdateAvatar={handleUpdateAvatar}
            />
          </div>

          <Button
            label="Excluir Conta"
            onClick={handleDeleteAccount}
            className="del"
          />
        </div>
      </div>
    </div>
  );
};

export default PageProfile;
