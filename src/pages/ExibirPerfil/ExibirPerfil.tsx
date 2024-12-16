import styles from './ExibirPerfil.module.css';
import reactIcon from '../../assets/react.svg';
import chatBubble from '../../assets/chat_bubble.png';

const ExibirPerfil = () => {

    const test = () => console.log("Hello World!");

    return (
        <div className={styles.exibirPage}>
            <div className={styles.bodyExibir}>
                <div className={styles.exibirBox}>
                    <img src={reactIcon} alt="Foto de Perfil" className={styles.userIcon} />
                    <h1 className={styles.username}>Nome do usuário</h1>
                    <h1 className={styles.userAt}>@username</h1>
                    <h1 className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quod dolorem repellat quos labore. Laudantium vitae, blanditiis qui saepe, et harum nesciunt laboriosam maxime, repellendus eius maiores adipisci hic quas? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus beatae unde illum eaque consequatur animi cum aperiam commodi vitae sunt soluta autem corporis obcaecati laudantium sapiente rem, hic necessitatibus culpa.</h1>
                    <div className={styles.teacherStudent}>
                        <span>Professor/Aluno</span>
                    </div>
                    <div className={styles.topicsTitle}>
                        Curso:<br></br><br></br>
                        Matrícula:<br></br><br></br>
                        Semestre Atual:<br></br><br></br>
                        Matéria Favorita:<br></br><br></br>
                        Comida do RU favorita:
                        <h1 className={styles.topicsCourse}>Lorem</h1>
                        <h1 className={styles.topicsMatricula}>Lorem</h1>
                        <h1 className={styles.topicsSemester}>Lorem</h1>
                        <h1 className={styles.topicsTheme}>Lorem</h1>
                        <h1 className={styles.topicsMeat}>Lorem</h1>
                    </div>
                    <div className={styles.linhaVert}></div>
                </div>
            </div>
            <button className={styles.chatButton} onClick={test}>
                <img src={chatBubble} alt="Botão de Chat" className={styles.chatImg} />
            </button>
        </div>
    );

}

export default ExibirPerfil;