import { elements } from './base';


export const searchValue = () => elements.searchForm.value; // returneaza valoarea inputului

const displayImage = (photo) => {
  const markup = `
    <div class="images__container">
          <img
            src="${photo.src} data-photoID=${photo.id}" />

          <a href="#photo=${photo.id}" class="images__container__info">
            <div class="info__wrapper">

              <div class="images__container__info__link">
                <ion-icon name="link-outline"></ion-icon> Click for more info
              </div>
              <div>
                <ion-icon name="hand-left-outline"></ion-icon> Drag & Drop to
                save in collection
              </div>
            </div>
          </a>
        </div>
    `
  return markup;
}

const componentInfoSearch = (search) => {
  const markup = `
      <h2 class="search__info__keyword">${search.query}</h2>
      <p class="search__info__number">${search.total}</p>
  `;
  return markup;
}

export const clearSearchInfo = () => {
  // undisplay search info
  elements.searchInfo.innerHTML = ' ';
}

// de bagat in .search__info
export const displaySearchInfo = (search) => {

  clearSearchInfo();

  // add the new search infos
  elements.searchInfo.insertAdjacentHTML('afterbegin', componentInfoSearch(search));
}


export const removeNoPhotos = (state) => {
  if (state) {
    elements.noPhotos.classList.add('active');

  } else {
    elements.noPhotos.classList.remove('active');
  }
}


export const uptPageNr = (page, totalPages) => {
  elements.pageNr.textContent = `${page} / ${totalPages}`;
}

export const pagVisibility = (state) => {
  if (state) {
    elements.pagination.classList.add('active');

  } else {
    elements.pagination.classList.remove('active');
  }
}

export const displayErr = (state) => {
  if (state) {
    elements.searchErr.classList.remove('active');
  } else {
    elements.searchErr.classList.add('active');
  }
}

export const displayPhoto = (photos) => {
  photos.forEach(el => {
    elements.imgContainer.insertAdjacentHTML('beforeend', displayImage(el));
  })
}

export const clearSearch = () => {
  elements.searchForm.value = '';
}

export const clearPhotos = () => {
  elements.imgContainer.innerHTML = ' ';
}

//pagination

export const pagination = () => {

  // change page in state

}

export const displaySearchState = (state) => {
  state ? elements.searchState.classList.add('active') : elements.searchState.classList.remove('active');
}