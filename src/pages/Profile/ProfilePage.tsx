import React, { useState, useEffect } from 'react';
import styles from "./ProfilePage.module.css";
import reactIcon from "../../assets/react.svg";
import chatBubble from "../../assets/chat_bubble.png";

const ProfilePage = ({ apiUrl }) => {
  const [userData, setUserData] = useState({
    userType: null,
    course: null,
    registration: null,
    currentSemester: null,
    favoriteSubject: null,
    favoriteFood: null,
  });
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
        setUserData({
          userType: data.userType, // "Professor" ou "Aluno"
          course: data.course, // Curso do usuário
          registration: data.registration, // Matrícula
          currentSemester: data.currentSemester, // Semestre atual
          favoriteSubject: data.favoriteSubject, // Matéria favorita
          favoriteFood: data.favoriteFood, // Comida favorita do RU
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  const test = () => console.log("Hello World!");

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
          <img src={reactIcon} alt="Foto de Perfil" className={styles.userIcon} />
          <h1 className={styles.username}>Nome do usuário</h1>
          <h1 className={styles.userAt}>@username</h1>
          <h1 className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quod dolorem repellat quos
            labore. Laudantium vitae, blanditiis qui saepe, et harum nesciunt laboriosam maxime,
            repellendus eius maiores adipisci hic quas? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Ducimus beatae unde illum eaque consequatur animi cum aperiam commodi
            vitae sunt soluta autem corporis obcaecati laudantium sapiente rem, hic necessitatibus
            culpa.
          </h1>
          <div className={styles.teacherStudent}>
            <span>{userData.userType}</span>
          </div>
          <div className={styles.topicsTitle}>
            Curso:<br></br>
            <h1 className={styles.topicsCourse}>{userData.course}</h1>
            <br></br>
            Matrícula:<br></br>
            <h1 className={styles.topicsMatricula}>{userData.registration}</h1>
            <br></br>
            Semestre Atual:<br></br>
            <h1 className={styles.topicsSemester}>{userData.currentSemester}</h1>
            <br></br>
            Matéria Favorita:<br></br>
            <h1 className={styles.topicsTheme}>{userData.favoriteSubject}</h1>
            <br></br>
            Comida do RU favorita:
            <h1 className={styles.topicsMeat}>{userData.favoriteFood}</h1>
          </div>
          <div className={styles.linhaVert}></div>
        </div>
      </div>
      <button className={styles.chatButton} onClick={test}>
        <img src={chatBubble} alt="Botão de Chat" className={styles.chatImg} />
      </button>
    </div>
  );
};

export default ProfilePage;