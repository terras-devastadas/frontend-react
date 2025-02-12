import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import styles from './SearchBar.module.css';
import CommunityIcon from '../../assets/CommunityIcon.png';
import { ClipLoader } from 'react-spinners';

interface SearchResult {
  communityName: string;
  banner: string;
  id: string;
  communityDescription: string;
  // Adicionar outras propriedades conforme necessário
}

const SearchPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [followingCommunities, setFollowingCommunities] = useState<string[]>([]);

  // Atualizar o termo de pesquisa quando a URL muda
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      setSearchTerm(query);
    } else {
      setSearchTerm(""); // Limpar a pesquisa se não houver termo
    }
  }, [location.search]);

  // Buscar os resultados com base no termo de pesquisa
  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        setResults([]); // Limpar os resultados se não houver termo
        return;
      }

      setLoading(true);
      try {
        const response = await api.get<SearchResult[]>(`/search?query=${searchTerm}`);
        setResults(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    const loadUserData = () => {
      const userString = sessionStorage.getItem('User');
      if (userString) {
        const user = JSON.parse(userString);
        setFollowingCommunities(user.community_ids || []);
      }
      setLoadingUser(false); // Dados do usuário carregados
    };

    loadUserData();
  }, []);

  const handleActionCommunity = async (id: string) => {
    if (loadingUser) return; // Previne ações antes dos dados carregarem

    const userString = sessionStorage.getItem('User');
    if (!userString) return;

    const user = JSON.parse(userString);
    let updatedCommunityIds = [...user.community_ids];

    if (followingCommunities.includes(id)) {
      updatedCommunityIds = updatedCommunityIds.filter(communityId => communityId !== id);
    } else {
      updatedCommunityIds.push(id);
    }

    try {
      const response = await api.post(`/info/`, { community_ids: updatedCommunityIds });

      if (response.status === 200) {
        user.community_ids = updatedCommunityIds;
        sessionStorage.setItem('User', JSON.stringify(user));
        setFollowingCommunities(updatedCommunityIds);
        window.dispatchEvent(new CustomEvent("community-joined"));
      }
    } catch (error) {
      console.error("Erro ao atualizar comunidade:", error);
    }
  };

  if (loading || loadingUser) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#0b2548" loading={true} size={50} />
      </div>
    );
  }

  if (loading) return(
    <div className={styles.loadingContainer}> 
      <ClipLoader color="#0b2548" loading={true} size={50} />
    </div>
  )
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div className={styles.communities} key={index}>
            {result.banner && (
              <div className={styles.bannerContainer}>
                <img src={result.banner} alt={`${result.communityName} banner`} className={styles.image} />
              </div>
            )}

            <div className={styles.communityInfo}>
              <div className={styles.iconContainer}>
                <img src={CommunityIcon} alt="Icone de comunidade" width='100' className={styles.icon} />
              </div>

              <div className={styles.communityNameContainer}>
                <div className={styles.title}>
                <Link to={`/comunidade/${result.id}`} className={styles.link} key={index}>
                  <h2 className={styles.name}>{result.communityName}</h2>
                  </Link>
                </div>
                
                <div className={styles.description}>
                  <p>{result.communityDescription}</p>
                </div>
              </div>
            </div>
            <button className={styles.actionButton} onClick={() => handleActionCommunity(result.id)}>{followingCommunities.includes(result.id) ? "Sair" : "Seguir"}</button>
          </div>
        ))
      ) : (
        <div>Nenhum resultado encontrado.</div>
      )}
    </>
  );
};

export default SearchPage;