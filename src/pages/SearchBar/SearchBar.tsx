import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import styles from './SearchBar.module.css';

interface SearchResult {
  communityName: string;
  banner: string;
  // Adicione outras propriedades conforme necessário
}

const SearchPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) return;

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
      {results && results.map((result, index) => (
        <div className={styles.communities} key={index}>
          <h2 className={styles.title}>{result.communityName}</h2>
          {result.banner && (
            <div>
              <img src={result.banner} alt={`${result.communityName} banner`} className={styles.image} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default SearchPage;