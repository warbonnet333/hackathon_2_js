import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org';
const KEY = '5a24b7189a6caa5f12a9aa4d37534986';

export const getArticles = (page = 1) => {
  const url = `/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&language=en-US&page=${page}&&include_adult=false`;
  return axios.get(url);
};

export const getMovieByID = id => {
  const url = `/3/movie/${id}?api_key=9e008f5d338cd1f22f432e50e537417d&language=en-US`;
  return axios.get(url);
};
