import styles from "./EditProfile.module.css";
import reactIcon from "../../assets/react.svg";
import chatBubble from "../../assets/chat_bubble.png";
import deleteButton from "../../assets/DeleteButton.png";
import enterButton from "../../assets/EnterButton.png";
import TextField from "../../components/TextField/TextField";
import InputField from "../../components/InputField/InputField";
import { useState, useEffect } from "react";
import api from "../../services/api";

const EditProfilePage = () => {
  const test = () => console.log("Hello World!");

  const [profileDescription, setProfileDescription] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [semesterName, setSemesterName] = useState<string>("");
  const [themeName, setThemeName] = useState<string>("");
  const [meatName, setMeatName] = useState<string>("");
  const [username, setUsername] = useState<string>("Nome do usuário");
  const [photo_profile, setProfileImage] = useState<string>("");
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    // Exemplo de requisição GET
    api.get('/info')
      .then(response => {
        const data = response.data;
        setProfileDescription(data.bio);
        setCourseName(data.courseName);
        setSemesterName(data.semesterName);
        setThemeName(data.themeName);
        setMeatName(data.meatName);
        setUsername(data.username);
        setProfileImage(`${api.defaults.baseURL}${data.photo_profile}`);
      })
      .catch(error => {
        console.error('Erro ao buscar perfil:', error);
      });
  }, []);

  const handleSaveProfile = () => {
    // Exemplo de requisição POST
    const profileData = {
      profileDescription,
      courseName,
      semesterName,
      themeName,
      meatName,
      username,
      photo_profile,  
    };

    api.post('/info/', profileData)
      .then(response => {
        console.log('Perfil salvo com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao salvar perfil:', error);
      });
  };

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
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            required
          />

          <div className={styles.teacherStudent}>
            <span>Professor/Aluno</span>
          </div>
          <div className={styles.topicsTitle}>
            Curso:<br />
            <br />
            Matrícula: 28903223
            <br />
            <br />
            Semestre Atual:
            <br />
            <br />
            Matéria Favorita:
            <br />
            <br />
            Comida do RU favorita:
            <InputField
              variant="primary"
              htmlFor="name"
              className={styles.topicsCourse}
              label=""
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />

            <InputField
              variant="primary"
              htmlFor="name"
              className={styles.topicsSemester}
              label=""
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              required
            />

            <InputField
              variant="primary"
              htmlFor="name"
              className={styles.topicsTheme}
              label=""
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              required
            />

            <InputField
              variant="primary"
              htmlFor="name"
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

      <button className={styles.deleteButton} onClick={test}>
        <img src={deleteButton} alt="Botão de Deletar Conta" className={styles.deleteImg} />
      </button>

      <button className={styles.enterButton} onClick={handleSaveProfile}>
        <img src={enterButton} alt="Botão de Enter" className={styles.enterImg} />
      </button>
    </div>
  );
};

export default EditProfilePage;