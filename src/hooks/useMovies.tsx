import {useEffect, useState} from 'react';
import moviesApi from '../api/moviesApi';
import {Movie, MoviesResponse} from '../interfaces/movies.interfaces';
import {orderByNameAsc} from '../utils/movies.util';
interface MoviesState {
  nowPlaying: Movie[];
  recommendations: Movie[];
}

export const useMovies = (idRecommendation: number = 0) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    recommendations: [],
  });

  const getMovies = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const {
        data: {results: moviesNowPlaying},
      } = await moviesApi.get<MoviesResponse>('/now_playing', {
        params: {page: 1},
      });
      if (moviesNowPlaying.length) {
        const responseRecommendations = await moviesApi.get<MoviesResponse>(
          `/${idRecommendation || moviesNowPlaying[0].id}/recommendations`,
        );
        setMoviesState({
          nowPlaying: orderByNameAsc(moviesNowPlaying),
          recommendations: orderByNameAsc(responseRecommendations.data.results),
        });
      }
      setIsLoading(false);
    } catch {
      setError('Ocurrio un problema');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {...moviesState, isLoading, error};
};
