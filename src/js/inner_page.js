
import * as API from './services/server';
import filmTemplate from './templates/single-film.hbs';

import '../css/styles.css';
import '../css/film-list.css';

const innerPage = document.querySelector(".add-queue")
const film = document.querySelector(".film")




function concatGenreNamesBYComa(filmData) {
  filmData.genres = filmData.genres.reduce((genreString, genre, index, array) => {
    const wordSeparator = index === array.length - 1 ? '' : ',';
    return `${genreString} ${genre.name}${wordSeparator}`
  }, '')
}

function getFullInfo(event) {
  const filmId = event.target.dataset.id;
  API.getMovieByID(filmId).then(result => {
    const { data } = result;
    const markup = buildMarkup(data);
    insertMarkup(markup);
  });
}
function buildMarkup(item) {
  concatGenreNamesBYComa(item)
  return filmTemplate(item);
}
function insertMarkup(markup) {
  film.insertAdjacentHTML('beforeend', markup);
}
innerPage.addEventListener('click', getFullInfo);
