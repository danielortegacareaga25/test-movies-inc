import {Movie} from '../interfaces/movies.interfaces';

export const orderByNameAsc = (movies: Movie[]): Movie[] => {
  return movies.sort((a, b) => (a.title < b.title ? -1 : 1));
};
