import React, { useState, useEffect } from 'react';
import styles from "./ProfilePage.module.css";
import reactIcon from "../../assets/react.svg";
import chatBubble from "../../assets/chat_bubble.png";
import api from "../../services/api";

const ProfilePage = ({}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [userData, setUserData] = useState({
    userType: null,
    course: null,
    registration: null,
    currentSemester: null,
    favoriteSubject: null,
    favoriteFood: null,
    photo_profile: null,
    first_name: null, // Novo campo para o nome do usuário
    username: null, // Novo campo para o @username
    bio: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/info/');

        const data = response.data;
        setUserData({
          userType: data.is_staff, // "Professor" ou "Aluno"
          course: data.course, // Curso do usuário
          registration: data.matricula, // Matrícula
          currentSemester: data.semester, // Semestre atual
          favoriteSubject: data.subject, // Matéria favorita
          favoriteFood: data.food, // Comida favorita do RU
          photo_profile: data.photo_profile, // Foto de perfil
          first_name: data.first_name, // Nome do usuário
          username: data.username, // @username
          bio: data.bio, // Descrição
        });
      } catch (error) {
        console.error("Erro ao buscar dados", error);
        setError("Ocorreu um erro ao buscar os dados do usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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



        <img
            src={
              userData.photo_profile
                ? userData.photo_profile.startsWith("http")
                  ? userData.photo_profile
                  : `${api.defaults.baseURL}${userData.photo_profile}`
                : reactIcon
            }
            alt="Foto de Perfil"
            className={styles.userIcon}
          />
          
          
          
          
          <h1 className={styles.username}>{userData.first_name}</h1> {/* Nome do usuário */}
          <h1 className={styles.userAt}>@{userData.username}</h1> {/* @username */}
          <h1 className={styles.description}>
            {userData.bio || "Sem descrição"}
          </h1>
          <div className={styles.teacherStudent}>
            <span>{userData.userType ? "Professor" : "Aluno"}</span>
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