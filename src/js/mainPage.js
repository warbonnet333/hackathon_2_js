import * as API from '../services/server';
import mainArticleTemplate from '../templates/main-page.hbs';
import './scrollTop';
import scrollToTop from './scrollToTop';
import mapper from './mapper';
import { debounce } from 'debounce';
import getFullInfo from './inner_page';
import { showWatchedFilms } from './watched';

const refs = {
  articleList: document.querySelector('.article-list'),
  searchInput: document.querySelector('.searchInput'),
  searchBar: document.querySelector('.searchBar'),
  buttonNext: document.querySelector('.next'),
  buttonPrev: document.querySelector('.prev'),
  paginationBoxInfo: document.querySelector('.pagination-box-info'),
  warningBox: document.querySelector('.warning-wrapper'),
  homeBtn: document.querySelector('[data-action="home"]'),
  libraryBtn: document.querySelector('.js-library'),
  listWatch: document.querySelector('#watched_list'),
  listArticle: document.querySelector('.article-list'),
  filmPage: document.querySelector('#film-page'),
  paginationBox: document.querySelector('.pagination-box'),
  navBtns: document.querySelector('.nav-btns'),
  watcheBtn: document.querySelector('.js-watched'),
  queueBtn: document.querySelector('.js-queue'),
};

export default refs;

refs.articleList.addEventListener('click', getFullInfo);
refs.listWatch.addEventListener('click', getFullInfo);
refs.libraryBtn.addEventListener('click', showWatchedFilms);
refs.homeBtn.addEventListener('click', fetchArticlesCall);
document.querySelector('.logo').addEventListener('click', fetchArticlesCall);
refs.watcheBtn.addEventListener('click', showWatchedFilms);

let page = 1;

function fetchArticlesCall(event) {
  fetchArticles();
}

const fetchArticles = (page = 1) => {
  refs.filmPage.innerHTML = '';
  refs.listWatch.innerHTML = '';
  refs.searchInput.classList.remove('hidden');
  refs.paginationBox.classList.remove('hidden');
  refs.navBtns.classList.add('hidden');
  refs.searchBar.classList.remove('hidden');
  refs.paginationBoxInfo.textContent = page;
  page === 1 ? refs.buttonPrev.classList.add('hiddenButton') : null;
  API.getArticles(page)
    .then(({ data }) => {
      createMarkup(data);
    })
    .catch(err => console.log(err));
};

const handleFetchSearchedArticles = ({ target }) => {
  const query = target.value;
  if (query) {
    API.searchArticles(query)
      .then(({ data }) => {
        data.results.length ? createMarkup(data) : printWarning();
      })
      .catch(err => console.log(err));
  } else {
    refs.warningBox.classList.remove('warning-wrapper-show');
    fetchArticles();
  }
};

const createMarkup = data => {
  refs.warningBox.classList.remove('warning-wrapper-show');
  refs.articleList.innerHTML = '';
  const markup = mapper(data.results).map(article =>
    mainArticleTemplate(article),
  );
  refs.articleList.insertAdjacentHTML('beforeend', markup.join(''));
};

const handleChangePage = e => {
  if (e.target.classList.contains('next')) {
    page += 1;
    refs.buttonPrev.classList.remove('hiddenButton');
  } else if (e.target.classList.contains('prev')) {
    page > 1 ? (page -= 1) : null;
  }
  fetchArticles(page);
  refs.paginationBoxInfo.textContent = page;
  e.preventDefault();
  window.scrollTo({
    top: 0,
  });
};

const printWarning = () => {
  refs.warningBox.classList.add('warning-wrapper-show');
};

refs.searchInput.addEventListener(
  'input',
  debounce(handleFetchSearchedArticles, 500),
);
refs.buttonNext.addEventListener('click', handleChangePage);
refs.buttonPrev.addEventListener('click', handleChangePage);
fetchArticles();
