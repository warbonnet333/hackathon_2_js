import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
const KEY = '5a24b7189a6caa5f12a9aa4d37534986';

export const getArticles = (page = 1) => {
  const url = `/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&perPage=2language=en-US&page=${page}&&include_adult=false&total_results=12&total_pages=10`;
  return axios.get(url);
};

export const searchArticles = (query, page = 1) => {
  const url = `/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
  return axios.get(url);
};
