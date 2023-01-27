import {useState, useEffect} from 'react';
import moviesApi from '../api/moviesApi';
import {Cast, CreditsResponse} from '../interfaces/credits.interfaces';
import {MovieFull} from '../interfaces/movies.interfaces';
interface MovieDetails {
  cast: Cast[];
  isLoading: boolean;
  movieFull?: MovieFull;
}

export const useMovieDetails = (id: number) => {
  const [state, setState] = useState<MovieDetails>({
    cast: [],
    isLoading: true,
    movieFull: undefined,
  });

  const getMovieDetais = async () => {
    const movieDefailsPromise = moviesApi.get<MovieFull>(`/${id}`);
    const castPromise = moviesApi.get<CreditsResponse>(`/${id}/credits`);

    const [movieDetail, cast] = await Promise.all([
      movieDefailsPromise,
      castPromise,
    ]);
    setState({
      movieFull: movieDetail.data,
      cast: cast.data.cast,
      isLoading: false,
    });
  };

  useEffect(() => {
    getMovieDetais();
  }, []);

  return {...state};
};
