import './sass/App.scss';
import './sass/Search.scss';
import './sass/Header.scss';

import Search from './classes/Search';

window.addEventListener('DOMContentLoaded', (event) => {
  const search = new Search();
  search.init();
});
