import * as API from './server';
import watchedFilmsMarkup from '../handelbars/watched-page.hbs';
import '../styles/watched.css';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
// import './node_modules/pnotidistfy//PNotifyBrightTheme.css';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

const list = document.querySelector('#watched_list');

const upperFnToAdd = event => {
  const localListName = event.target.dataset.action;
  console.log(localListName);
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
    showWatchedFilms();
  });
};

const upperFnToRemove = event => {
  const localListName = event.target.dataset.action;
  const filmId = Number(event.target.dataset.id);

  lowerFnToRemove(localListName, filmId);
  showWatchedFilms();
};

const lowerFnToRemove = (arrayToWork, filmIdToDelete) => {
  const localList = JSON.parse(localStorage.getItem(arrayToWork));
  if (localList.find(film => film.id === filmIdToDelete)) {
    const arrayToLocal = localList.filter(film => film.id !== filmIdToDelete);
    localStorage.setItem(arrayToWork, JSON.stringify(arrayToLocal));
  }
};

const createMarkup = array => {
  return array.map(filmItem => watchedFilmsMarkup(filmItem)).join(' ');
};

const showWatchedFilms = () => {
  list.innerHTML = ' ';
  const filmsArray = JSON.parse(localStorage.getItem('filmsToWatch'));
  if (filmsArray) {
    list.insertAdjacentHTML('beforeend', createMarkup(filmsArray));
  }
};

const addBtn = document.querySelector('.add_to_watched');
const deleteBtn = document.querySelector('.delete-btns');
const deleteBtnQueue = document.querySelector('.delete-btn--queue');
console.log(deleteBtnQueue);
addBtn.addEventListener('click', upperFnToAdd);
deleteBtn.addEventListener('click', upperFnToRemove);

showWatchedFilms();
console.log(deleteBtn);

const notifyAction = libraryName => {
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

// const showBtn = document.querySelector('.watched');
// showBtn.addEventListener('click', showWatchedFilms);
