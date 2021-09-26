class Gallery {
  constructor() {
    this.galleryWrapper = document.querySelector('.gallery');
  }

  createURL(breed, subBreed) {
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
      }
    })();
  }

  createGallery(breed) {
    const wordsArray = breed.split(' ').reverse();
    const url = this.createURL(wordsArray[0], wordsArray[1]);
    this.getImageURL(url);
  }

  render(imgURL) {
    this.galleryWrapper.textContent = '';
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');
    imgWrapper.classList.add('gallery__img-wrapper');
    img.classList.add('gallery__img');
    imgWrapper.style.backgroundImage = `url('${imgURL}')`;
    img.src = imgURL;
    imgWrapper.appendChild(img);
    this.galleryWrapper.appendChild(imgWrapper);
  }
}

export default Gallery;
