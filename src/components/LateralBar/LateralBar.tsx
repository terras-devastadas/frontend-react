import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styles from '../LateralBar/LateralBar.module.css';
import CommunityIcon from '../../assets/CommunityIcon.png';
import Avatar from "../../assets/AvatarPlaceholder.png";
import ArrowLeft from '../../assets/ArrowLeft.png';

interface Community {
  id: string;
  communityName: string;
  // Outras propriedades se necessário
}

const LateralBar = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [username, setUsername] = useState("");
  // const [profilePicture, setProfilePicture] = useState();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunities() {
      const userString = sessionStorage.getItem('User');//resgata o user
      if (!userString) return;
      
      const userJson = JSON.parse(userString);//convertendo para json
      setUsername(userJson.username);//seta o user
      setProfilePicture(userJson.photo_profile);//seta a foto de perfil
      console.log(userJson.photo_profile);


      const communitiesIds: string[] = userJson.community_ids;

      if (communitiesIds.length === 0) return;

      try {
        const response = await api.get('/users/my-communities/')
        setCommunities(response.data);
      } catch (error) {
        console.error("Erro ao buscar comunidades:", error);
      };
    };
    fetchCommunities();

    const updateCommunities = () => {
      fetchCommunities(); // Função que refaz a requisição das comunidades
    };
    window.addEventListener("community-joined", updateCommunities);
  
    return () => {
      window.removeEventListener("community-joined", updateCommunities);
    };
  }, []);

  const handleLogout = () => {}

  return (
    <aside className={styles.sidebar}>
      <div className={styles.buttonsContainer}>
        <div className={styles.createCommunityContainer}>
          <Link to="/criar-comunidade" >
            <img src={CommunityIcon} alt="Criar comunidade" title='Criar comunidade' className={styles.createCommunityButton}/>
          </Link>
        </div>  
        <div className={styles.logoutContainer}>
            <img src={ArrowLeft} alt="Logout" onClick={handleLogout} className={styles.logout}/>
        </div>
      </div>


  
      <Link to="/editar-perfil">
        <div className={styles.profilePictureContainer} title='Ver perfil'>
          <img
              src={
                profilePicture
                  ? profilePicture.startsWith("http")
                    ? profilePicture
                    : `${api.defaults.baseURL}${profilePicture}`
                  : Avatar
              }
              alt="Foto de Perfil"
              className={styles.profilePicture}
          />
        </div>
      </Link>      
      <h2 className={styles.username}>@{username}</h2>
      <h2 className={styles.title}>Minhas Comunidades:</h2>
      <ul className={styles.communityList}>
        {communities.map((community) => (
          <li key={community.id} className={styles.communityItem}>
            <Link to={`/comunidade/${community.id}`} className={styles.communityLink}>
              <div className={styles.communityBox} title={community.communityName}>
                <span className={styles.iconGroup}>
                  <img src={CommunityIcon} alt="Ícone da comunidade" />
                </span>
                <span className={styles.communityName}>
                  {community.communityName}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default LateralBar;