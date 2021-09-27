import '../sass/Gallery.scss';

class Gallery {
  constructor() {
    this.breed = '';
    this.subBreed = '';
    this.galleryWrapper = document.querySelector('.gallery');
  }

  createURL(breed, subBreed) {
    this.breed = breed;
    this.subBreed = subBreed ? subBreed : '';
    const url = subBreed
      ? `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
      : `https://dog.ceo/api/breed/${breed}/images/random`;
    return url;
  }

  getImageURL(URL) {
    (async () => {
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const data = await response.json();
          const url = data.message;
          this.render(url);
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

  createGallery(breed) {
    const wordsArray = breed.split(' ').reverse();
    const url = this.createURL(wordsArray[0], wordsArray[1]);
    this.getImageURL(url);
  }

  createResetButton() {
    const button = document.createElement('button');
    button.classList.add('gallery__button', 'btn');
    button.textContent = `Show another ${this.subBreed} ${this.breed}`.trim();
    button.addEventListener('click', () => {
      this.createGallery(`${this.subBreed} ${this.breed}`.trim());
    });
    return button;
  }

  render(imgURL) {
    this.galleryWrapper.textContent = '';
    const imgWrapper = document.createElement('div');
    const imgBackground = document.createElement('div');
    const img = document.createElement('img');
    const button = this.createResetButton();
    imgBackground.classList.add('gallery__img-background');
    imgWrapper.classList.add('gallery__img-wrapper');
    img.classList.add('gallery__img');
    imgBackground.style.backgroundImage = `url('${imgURL}')`;
    img.src = imgURL;
    imgWrapper.appendChild(imgBackground);
    imgWrapper.appendChild(img);
    this.galleryWrapper.appendChild(imgWrapper);
    this.galleryWrapper.appendChild(button);
  }
}

export default Gallery;
