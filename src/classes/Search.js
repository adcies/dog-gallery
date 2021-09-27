import '../sass/Search.scss';
import Gallery from './Gallery';

class Search {
  constructor() {
    this.URL = 'https://dog.ceo/api/breeds/list/all';
    this.breedsList = [];
    this.input = document.querySelector('.search__input');
    this.autocompleteList = document.querySelector('.search__list');
    this.submitButton = document.querySelector('.search__button');
    this.liElements = document.querySelectorAll('.search__list-element');
    this.gallery = new Gallery(this.toggleDisableInteraction.bind(this));
  }

  handleSubmit(e) {
    const inputValue = this.input.value.trim().toLowerCase();
    if (inputValue) {
      if (
        this.breedsList.some(
          (item) => item.toLowerCase() === inputValue.toLowerCase()
        )
      ) {
        this.gallery.createGallery(inputValue);
      } else {
        alert('Please, enter the correct breed!');
      }
    }
    this.input.value = '';
  }

  createScrollList(dataArray) {
    this.autocompleteList.textContent = '';
    dataArray.forEach((element) => {
      const liElement = document.createElement('li');
      liElement.classList.add('search__list-element');
      liElement.textContent = element;
      this.addLiEvent(liElement);
      this.autocompleteList.appendChild(liElement);
    });
  }

  getBreedsList() {
    (async () => {
      try {
        const response = await fetch(this.URL);
        if (response.ok) {
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
          this.addInputListener();
          this.addInitialEvents();
          this.toggleDisableInteraction(false);
        } else {
          throw new Error(`Something went wrong - status: ${response.status}`);
        }
      } catch (err) {
        console.log(err);
        alert(
          "Something went wrong - couldn't fetch data. Check the console for more details..."
        );
      }
    })();
  }

  addLiEvent(element) {
    element.addEventListener('mousedown', (e) => {
      this.input.value = e.target.textContent;
    });
  }

  handleInputChange(element) {
    const dataList = this.breedsList.filter((item) => {
      if (item.includes(element.value.trim().toLowerCase())) return item;
    });
    this.createScrollList(dataList);
  }

  addInputListener() {
    this.input.addEventListener('input', (e) => {
      this.handleInputChange(e.target);
    });
  }

  addInitialEvents() {
    this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
    this.input.addEventListener('focusin', (e) => {
      this.handleInputChange(this.input);
      this.autocompleteList.classList.add('search__list--active');
    });
    this.input.addEventListener('focusout', (e) => {
      this.autocompleteList.classList.remove('search__list--active');
    });
  }

  toggleDisableInteraction(value) {
    this.input.disabled = value;
    this.submitButton.disabled = value;
  }

  init() {
    this.toggleDisableInteraction(true);

    this.getBreedsList();
  }
}

export default Search;
