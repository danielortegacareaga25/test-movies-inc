import axios from 'axios';

const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '41e43ea7ba2a30f03247205c7f650f5b',
    language: 'es-ES',
  },
});

export default moviesApi;
