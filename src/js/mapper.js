const apiImgPath = 'https://image.tmdb.org/t/p/w400/';
const defaultImage = './images/default.jpg';
const imgUrl = 'https://i.ytimg.com/vi/VlsQC87i06w/maxresdefault.jpg';
const mapper = items => {
  return items.map(({ id, backdrop_path, title }) => ({
    id,
    title,
    backdrop_path,
    img_path: backdrop_path ? `${apiImgPath}${backdrop_path}` : imgUrl,
  }));
};
export default mapper;
