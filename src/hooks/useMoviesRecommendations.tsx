/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import moviesApi from '../api/moviesApi';
import {Movie, MoviesResponse} from '../interfaces/movies.interfaces';
import {orderByNameAsc} from '../utils/movies.util';

export const useMoviesRecommendations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [moviesRecommended, setMoviesRecommended] = useState<Movie[]>([]);
  const [idMovieRoot, setIdMovieRoot] = useState<number | null>(null);

  const getMoviesRecommendations = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (idMovieRoot) {
        const responseRecommendations = await moviesApi.get<MoviesResponse>(
          `/${idMovieRoot}/recommendations`,
        );
        setMoviesRecommended(
          orderByNameAsc(responseRecommendations.data.results),
        );
        setIsLoading(false);
      }
    } catch {
      setError('Ocurrio un problema');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (idMovieRoot) getMoviesRecommendations();
  }, [idMovieRoot]);

  return {
    moviesRecommended,
    isLoading,
    error,
    setIdMovieRoot,
  };
};
