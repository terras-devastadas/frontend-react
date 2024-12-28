import styles from "./EditProfile.module.css";
import reactIcon from "../../assets/react.svg";
import chatBubble from "../../assets/chat_bubble.png";
import deleteButton from "../../assets/DeleteButton.png";
import enterButton from "../../assets/EnterButton.png";
import TextField from "../../components/TextField/TextField"
import InputField from "../../components/InputField/InputField";
import { useState } from "react";

const EditProfilePage = () => {
  const test = () => console.log("Hello World!");

  const [profileDescription, setProfileDescription] = useState<string>("");

  const [courseName, setCourseName] = useState<string>("");

  const [semesterName, setSemesterName] = useState<string>("");

  const [themeName, setThemeName] = useState<string>("");

  const [meatName, setMeatName] = useState<string>("");

  return (
    <div className={styles.exibirPage}>
      <div className={styles.bodyExibir}>
        <div className={styles.exibirBox}>
          <img src={reactIcon} alt="Foto de Perfil" className={styles.userIcon} />
          <h1 className={styles.username}>Nome do usuário</h1>
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
            Curso:<br></br>
            <br></br>
            Matrícula: 28903223<br></br>
            <br></br>
            Semestre Atual:<br></br>
            <br></br>
            Matéria Favorita:<br></br>
            <br></br>
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

      <button className={styles.enterButton} onClick={test}>
        <img src={enterButton} alt="Botão de Enter" className={styles.enterImg} />
      </button>
    </div>
  );
};

export default EditProfilePage;
