import * as API from './server';
import watchedFilmsMarkup from '../handelbars/watched-page.hbs';
import '../styles/watched.css';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
// import './node_modules/pnotidistfy//PNotifyBrightTheme.css';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import './inner_page';
import refs from './mainPage';

const list = document.querySelector('#watched_list');

export const toggleWatched = event => {
  console.log(event.target);
  console.dir(event.target.textContent);
  if (event.target.classList.contains('added')) {
    upperFnToRemove(event);
    event.target.classList.remove('added');
    event.target.classList.add('video-icon');
    event.target.classList.remove('video-icon-remove');
    event.target.textContent = 'Add to library';
  } else {
    upperFnToAdd(event);
    event.target.classList.add('added');
    event.target.classList.remove('video-icon');
    event.target.classList.add('video-icon-remove');
    event.target.textContent = 'Remove from library';
  }
};

const upperFnToAdd = event => {
  const localListName = event.target.dataset.action;
  const filmId = Number(event.target.dataset.id);

  addToWatched(localListName, filmId);
  notifyAction(localListName);
};

const addToWatched = (arrayToWork, filmIdToAdd) => {
  const filmsToWatched = JSON.parse(localStorage.getItem(arrayToWork)) || [];

  API.getMovieByID(filmIdToAdd).then(({ data }) => {
    if (!filmsToWatched.find(filmTOWatch => filmTOWatch.id === data.id)) {
      filmsToWatched.push(data);
      localStorage.setItem(arrayToWork, JSON.stringify(filmsToWatched));
    }
  });
};

const upperFnToRemove = event => {
  const localListName = event.target.dataset.action;
  const filmId = Number(event.target.dataset.id);

  lowerFnToRemove(localListName, filmId);
};

const lowerFnToRemove = (arrayToWork, filmIdToDelete) => {
  const localList = JSON.parse(localStorage.getItem(arrayToWork));
  if (localList.find(film => film.id === filmIdToDelete)) {
    const arrayToLocal = localList.filter(film => film.id !== filmIdToDelete);
    localStorage.setItem(arrayToWork, JSON.stringify(arrayToLocal));
  }
};

const createMarkup = array => {
  return array.map(filmItem => watchedFilmsMarkup(filmItem)).join('');
};

// refs.libraryBtn.addEventListener('click', showWatchedFilms);

export const showWatchedFilms = () => {
  refs.listWatch.innerHTML = '';
  refs.filmPage.innerHTML = ' ';
  refs.listArticle.innerHTML = ' ';
  refs.searchInput.classList.add('hidden');
  refs.paginationBox.classList.add('hidden');
  refs.searchBar.classList.add('hidden');
  // refs.navBtns.classList.remove('hidden');
  const filmsArray = JSON.parse(localStorage.getItem('watched-films'));
  if (filmsArray) {
    list.insertAdjacentHTML('beforeend', createMarkup(filmsArray));
  }
};

export const notifyAction = libraryName => {
  PNotify.success({
    text: `Added to ${libraryName}`,
    animation: 'fade',
    delay: 2000,
    stack: {
      dir1: 'up',
      dir2: 'left', // zPosition from the top left corner.
      firstpos1: 90,
      firstpos2: 90, // 90px from the top, 90px from the left.
    },
    Mobile: {
      swipeDismiss: true,
      styling: true,
    },
  });
};
