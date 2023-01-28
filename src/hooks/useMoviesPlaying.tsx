import {useEffect, useState} from 'react';
import moviesApi from '../api/moviesApi';
import {Movie, MoviesResponse} from '../interfaces/movies.interfaces';
import {orderByNameAsc} from '../utils/movies.util';

export const useMoviesPlaying = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [moviesPlaying, setMoviesPlaying] = useState<Movie[]>([]);

  const getMovies = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const {
        data: {results: moviesNowPlaying},
      } = await moviesApi.get<MoviesResponse>('/now_playing', {
        params: {page: 1},
      });
      setMoviesPlaying(orderByNameAsc(moviesNowPlaying));

      setIsLoading(false);
    } catch {
      setError('Ocurrio un problema');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {moviesPlaying, isLoading, error};
};
