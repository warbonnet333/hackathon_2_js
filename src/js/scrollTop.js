import scrollToTop from './scrollToTop';
const scrollTopButton = document.querySelector('.scrollTopButton');
const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

const showButton = () => {
  if (document.documentElement.scrollTop > 140) {
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
};
scrollTopButton.addEventListener('click', scrollToTop);
window.addEventListener('scroll', showButton);
