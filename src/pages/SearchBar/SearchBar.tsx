import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import styles from './SearchBar.module.css';
import CommunityIcon from '../../assets/CommunityIcon.png';

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

  const handleJoinCommunity = async (id: string) => {
    const userString = sessionStorage.getItem('User');
    if (!userString) {
      console.error("Usuário não encontrado no sessionStorage");
      return;
    }
    const user = JSON.parse(userString);
    const listCommunity: string[] = user.community_ids || [];

    if (listCommunity.includes(id)) {
      console.log("Usuário já faz parte da comunidade.");
      return;
    }
    
    try{
      const updatedCommunityIds = [...listCommunity, id];//Criando uma nova lista com o id da nova comunidade
      const response = await api.post(`/info/`, {community_ids: updatedCommunityIds})

      if(response.status === 200){
        user.community_ids = updatedCommunityIds;//atualiando a lista de comunidades do user
        sessionStorage.setItem('User', JSON.stringify(user));
        window.dispatchEvent(new CustomEvent("community-joined"));
        console.log("Usuário adicionado à comunidade com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
 
};

  if (loading) return <div>Carregando...</div>;
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
            <button className={styles.actionButton} onClick={() => handleJoinCommunity(result.id)}>Entrar</button>
          </div>
        ))
      ) : (
        <div>Nenhum resultado encontrado.</div>
      )}
    </>
  );
};

export default SearchPage;