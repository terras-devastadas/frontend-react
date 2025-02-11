import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styles from '../LateralBar/LateralBar.module.css';
import CommunityIcon from '../../assets/CommunityIcon.png';

interface Community {
  id: string;
  communityName: string;
  // Outras propriedades se necessário
}

const LateralBar = () => {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    async function fetchCommunities() {
      const userString = sessionStorage.getItem('User');
      if (!userString) return;

      const userCredentials = JSON.parse(userString);
      const communitiesIds: string[] = userCredentials.community_ids || [];

      if (communitiesIds.length === 0) return;

      try {
        const response = await api.get('/users/my-communities/', { params: { ids: communitiesIds.join(',') } })
        setCommunities(response.data);
      } catch (error) {
        console.error("Erro ao buscar comunidades:", error);
      };
    };
    fetchCommunities();
  }, []);


  // Executa o fetch no mount
  // useEffect(() => {
  //   fetchCommunities();
  // }, [fetchCommunities]);

  // // Listener para atualizar as comunidades quando o evento for disparado
  // useEffect(() => {
  //   window.addEventListener('communityUpdate', fetchCommunities);
  //   return () => window.removeEventListener('communityUpdate', fetchCommunities);
  // }, [fetchCommunities]);

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Minhas Comunidades</h2>
      <ul className={styles.communityList}>
        {communities.map((community) => (
          <li key={community.id} className={styles.communityItem}>
            <Link to={`/comunidade/${community.id}`} className={styles.communityLink}>
              <div className={styles.communityBox}>
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