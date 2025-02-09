import styles from "./EditProfile.module.css";
import reactIcon from "../../assets/react.svg";
import chatBubble from "../../assets/chat_bubble.png";
import deleteButton from "../../assets/DeleteButton.png";
import enterButton from "../../assets/EnterButton.png";
import TextField from "../../components/TextField/TextField";
import InputField from "../../components/InputField/InputField";
import { useState, useEffect } from "react";
import api from "../../services/api";

const EditProfilePage = ({ apiUrl }) => {
  const [bio, setBio] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semesterName, setSemesterName] = useState("");
  const [themeName, setThemeName] = useState("");
  const [meatName, setMeatName] = useState("");
  const [username, setUsername] = useState("Nome do usuário");
  const [photo_profile, setProfileImage] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [userType, setUserType] = useState(""); // Novo estado para "Professor/Aluno"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        // Preenche os estados com os dados da API
        setBio(data.bio || "");
        setCourseName(data.courseName || "");
        setSemesterName(data.semesterName || "");
        setThemeName(data.themeName || "");
        setMeatName(data.meatName || "");
        setUsername(data.username || "Nome do usuário");
        setProfileImage(data.photo_profile || reactIcon);
        setUserType(data.userType || ""); // Define o tipo de usuário
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const profileData = {
      bio,
      courseName,
      semesterName,
      themeName,
      meatName,
      username,
      photo_profile,
      userType, // Inclui o tipo de usuário
    };

    // Exemplo de requisição POST para salvar o perfil
    api.post('/info/', profileData)
      .then(response => {
        console.log('Perfil salvo com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao salvar perfil:', error);
      });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className={styles.exibirPage}>
      <div className={styles.bodyExibir}>
        <div className={styles.exibirBox}>
          <div
            className={styles.profileImageContainer}
            onClick={() => document.getElementById('file-upload-profile')?.click()}
          >
            <img
              src={photo_profile || reactIcon}
              alt="Foto de Perfil"
              className={styles.userIcon}
            />
            <input
              type="file"
              onChange={handleImageChange}
              id="file-upload-profile"
              className={styles.fileInput}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div className={styles.usernameBox}>
            {isEditingUsername ? (
              <div className={styles.usernameInputWrapper}>
                <InputField
                  variant="primary"
                  label="Nome do Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.usernameInput}
                />
                <button
                  onClick={() => setIsEditingUsername(false)}
                  className={styles.saveUsernameButton}
                >
                  Salvar
                </button>
              </div>
            ) : (
              <>
                <h1 className={styles.username}>{username}</h1>
                <button 
                  onClick={() => setIsEditingUsername(true)} 
                  className={styles.editUsernameButton}
                >
                  Editar
                </button>
              </>
            )}
          </div>

          <h1 className={styles.userAt}>@username</h1>

          <TextField
            variant="primary"
            className={styles.description}
            htmlFor="description"
            label="Descrição:"
            value={bio}
            onChange={(e) => setbio(e.target.value)}
            required
          />

          <div className={styles.teacherStudent}>
            <span>{userType}</span> {/* Exibe o tipo de usuário */}
          </div>

          <div className={styles.topicsTitle}>
            Curso:<br />
            <InputField
              variant="primary"
              htmlFor="course"
              className={styles.topicsCourse}
              label=""
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
            <br />
            Matrícula: 28903223
            <br />
            <br />
            Semestre Atual:
            <InputField
              variant="primary"
              htmlFor="semester"
              className={styles.topicsSemester}
              label=""
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              required
            />
            <br />
            Matéria Favorita:
            <InputField
              variant="primary"
              htmlFor="theme"
              className={styles.topicsTheme}
              label=""
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              required
            />
            <br />
            Comida do RU favorita:
            <InputField
              variant="primary"
              htmlFor="meat"
              className={styles.topicsMeat}
              label=""
              value={meatName}
              onChange={(e) => setMeatName(e.target.value)}
              required
            />
          </div>
          <div className={styles.linhaVert}></div>
        </div>
      </div>

      <button className={styles.deleteButton} onClick={() => console.log("Deletar conta")}>
        <img src={deleteButton} alt="Botão de Deletar Conta" className={styles.deleteImg} />
      </button>

      <button className={styles.enterButton} onClick={handleSaveProfile}>
        <img src={enterButton} alt="Botão de Enter" className={styles.enterImg} />
      </button>
    </div>
  );
};

export default EditProfilePage;