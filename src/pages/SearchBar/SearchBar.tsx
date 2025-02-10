import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import styles from './SearchBar.module.css';

interface SearchResult {
  communityName: string;
  banner: string;
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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div className={styles.communities} key={index}>
            <h2 className={styles.title}>{result.communityName}</h2>
            {result.banner && (
              <div>
                <img src={result.banner} alt={`${result.communityName} banner`} className={styles.image} />
              </div>
            )}
          </div>
        ))
      ) : (
        <div>Nenhum resultado encontrado.</div>
      )}
    </>
  );
};

export default SearchPage;