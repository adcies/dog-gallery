class Search {
  constructor() {
    this.URL = 'https://dog.ceo/api/breeds/list/all';
    this.breedsList = [];
    this.input = document.querySelector('.search__input');
    this.autocompleteList = document.querySelector('.search__list');
    this.inputWrapper = document.querySelector('.search__input-wrapper');
    this.liElements = document.querySelectorAll('.search__list-element');
  }

  getBreedsList() {
    (async () => {
      const response = await fetch(this.URL);
      const data = await response.json();
      const dataArray = Object.keys(data.message);
      dataArray.forEach((item) => {
        if (data.message[item].length) {
          data.message[item].forEach((name) =>
            this.breedsList.push(`${name} ${item}`)
          );
        } else {
          this.breedsList.push(item);
        }
      });
      this.breedsList.sort();
      this.input.disabled = false;
    })();
  }

  addEvents() {
    this.liElements.forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        console.log(e.target.textContent);
      });
    });
    this.input.addEventListener('input', (e) => {
      console.log(e.target.value);
    });
    this.inputWrapper.addEventListener('focusin', (e) => {
      this.autocompleteList.classList.add('search__list--active');
    });
    this.inputWrapper.addEventListener('focusout', (e) => {
      this.autocompleteList.classList.remove('search__list--active');
    });
  }

  init() {
    this.input.disabled = true;
    this.addEvents();
    this.getBreedsList();
  }
}

export default Search;
