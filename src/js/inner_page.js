import * as API from './services/server';
import filmTemplate from './templates/single-film.hbs';
import refs from './mainPage';
import { toggleWatched } from './watched';

import '../css/styles.css';
import '../css/film-list.css';

const innerPage = document.querySelector('.add-queue');
const film = document.querySelector('.film');
const filmList = document.querySelector('.article-list');
const main = document.querySelector('.main');

function concatGenreNamesBYComa(filmData) {
  filmData.genres = filmData.genres.reduce(
    (genreString, genre, index, array) => {
      const wordSeparator = index === array.length - 1 ? '' : ',';
      return `${genreString} ${genre.name}${wordSeparator}`;
    },
    '',
  );
}

let addBtn;

function getFullInfo(event) {
  refs.listArticle.innerHTML = ' ';
  refs.listWatch.innerHTML = ' ';
  // refs.listWatch.style.gridTemplateRows = '0px';
  refs.searchInput.classList.add('hidden');
  refs.paginationBox.classList.add('hidden');
  const filmId = event.target.dataset.id;
  API.getMovieByID(filmId).then(result => {
    const { data } = result;
    const markup = buildMarkup(data);
    insertMarkup(markup);
    addBtn = document.querySelector('[data-action="watched-films"]');
    addBtn.addEventListener('click', toggleWatched);
    // removeBtn = document.querySelector('[data-action="del"]');
    // removeBtn.addEventListener('click', upperFnToAdd);
  });
}
function buildMarkup(item) {
  concatGenreNamesBYComa(item);
  return filmTemplate(item);
}
function insertMarkup(markup) {
  film.insertAdjacentHTML('beforeend', markup);
}
// filmList.addEventListener('click', getFullInfo);

export default getFullInfo;
