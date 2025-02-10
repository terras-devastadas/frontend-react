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
  const [bio, setBio] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semesterName, setSemesterName] = useState("");
  const [themeName, setThemeName] = useState("");
  const [meatName, setMeatName] = useState("");
  const [firstName, setFirstName] = useState("Nome do usuário"); // Renomeado para firstName
  const [username, setUsername] = useState("@username"); // Renomeado para username
  const [photo_profile, setProfileImage] = useState("");
  const [isEditingFirstName, setIsEditingFirstName] = useState(false); // Renomeado para isEditingFirstName
  const [userType, setUserType] = useState(""); // Novo estado para "Professor/Aluno"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registration, setRegistration] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/info/');

        const data = response.data;
        // Preenche os estados com os dados da API
        setBio(data.bio || "");
        setCourseName(data.course || "");
        setSemesterName(data.semester || "");
        setThemeName(data.subject || "");
        setMeatName(data.food || "");
        setFirstName(data.firstName || "Nome do usuário"); // Nome do usuário (firstName)
        setUsername(data.username ? `@${data.username}` : "@username"); // @username
        setProfileImage(data.photo_profile);
        setUserType(data.is_staff || ""); // Define o tipo de usuário
        setRegistration(data.matricula || "");
      } catch (error) {
        setError('NUM deu');
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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


  interface ProfileData {
    subject: string;
    food: string;
    username: string;
    bio: string;
    course: string;
    semester: string;
    photo_profile?: string;
}


  const handleSaveProfile = () => {
    const profileData = {
      subject: themeName,
      food: meatName,
      username: username.replace("@", ""), // Remove o "@" antes de enviar
      bio,
      course: courseName,
      semester: semesterName,
      
    };
      
      if (photo_profile && photo_profile.startsWith("data:")) {
        profileData.photo_profile = photo_profile;
      }
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
            src={
              photo_profile
                ? photo_profile.startsWith("data:")
                  ? photo_profile
                  : `${api.defaults.baseURL}${photo_profile}`
                : reactIcon
            }
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
            {isEditingFirstName ? (
              <div className={styles.usernameInputWrapper}>
                <InputField
                  variant="primary"
                  label="Nome do Usuário"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={styles.usernameInput}
                />
                <button
                  onClick={() => setIsEditingFirstName(false)}
                  className={styles.saveUsernameButton}
                >
                  Salvar
                </button>
              </div>
            ) : (
              <>
                <h1 className={styles.username}>{firstName}</h1> {/* Exibe o firstName */}
                <button 
                  onClick={() => setIsEditingFirstName(true)} 
                  className={styles.editUsernameButton}
                >
                  Editar
                </button>
              </>
            )}
          </div>

          <h1 className={styles.userAt}>{username}</h1> {/* Exibe o username */}

          <TextField
            variant="primary"
            className={styles.description}
            htmlFor="description"
            label="Descrição:"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />

          <div className={styles.teacherStudent}>
            <span>{userType ? "Professor" : "Aluno"}</span> {/* Exibe o tipo de usuário */}
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

            Matrícula: {registration}
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