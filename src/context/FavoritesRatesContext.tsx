/* eslint-disable react/react-in-jsx-scope */
import {createContext, useState} from 'react';
import {MovieFavorite} from '../interfaces/movies.interfaces';

export type MovieRated = {
  idMovie: number;
  rate: number;
};

interface ContextProps {
  favorites: number[];
  moviesFavorites: MovieFavorite[];
  setFavorite: (movie: MovieFavorite) => void;
  isFavorite: (idMovie: number) => boolean;
  setRateMovie: (idMovie: number, rate: number) => void;
  getRateMovie: (
    idMovie: number,
    voteAverage?: number,
    voteCount?: number,
  ) => number;
  moviesRated: MovieRated[];
}

export const FavoritesRatesContext = createContext({} as ContextProps);

export const FavoritesRatesProvider = ({children}: any) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [moviesFavorites, setMoviesFavorites] = useState<MovieFavorite[]>([]);
  const [moviesRated, setMoviesRated] = useState<MovieRated[]>([]);

  const setFavorite = (movie: MovieFavorite) => {
    if (favorites.includes(movie.id)) {
      setFavorites(favorites.filter(fav => fav !== movie.id));
      setMoviesFavorites(
        moviesFavorites.filter(movieFavorite => movieFavorite.id !== movie.id),
      );
    } else {
      setFavorites(favs => [...favs, movie.id]);
      setMoviesFavorites(movies => [...movies, movie]);
    }
  };

  const isFavorite = (idMovie: number) => {
    return favorites.includes(idMovie);
  };

  const setRateMovie = (idMovie: number, rate: number) => {
    const moviesFiltered = moviesRated.filter(
      movie => movie.idMovie === idMovie,
    );
    setMoviesRated([...moviesFiltered, {idMovie, rate}]);
  };

  const getRateMovie = (
    idMovie: number,
    voteAverage: number = 0,
    voteCount: number = 0,
  ): number => {
    const movie = moviesRated.find(mov => mov.idMovie === idMovie);
    return movie
      ? Number(
          ((voteAverage * voteCount + movie.rate) / (voteCount + 1)).toFixed(2),
        )
      : voteAverage;
  };

  return (
    <FavoritesRatesContext.Provider
      value={{
        favorites,
        moviesRated,
        moviesFavorites,
        setFavorite,
        setRateMovie,
        isFavorite,
        getRateMovie,
      }}>
      {children}
    </FavoritesRatesContext.Provider>
  );
};
