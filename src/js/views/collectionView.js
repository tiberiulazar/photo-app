import { elements } from './base';

export const displayPopup = (state) => {
    state ? elements.popup.classList.add('active') : elements.popup.classList.remove('active');
}

export const clearPopup = () => {
    // clear input
    elements.collName.value = '';
    // clear textarea
    elements.collDescr.value = '';
}

export const clearCollections = () => {
    elements.collections.innerHTML = '';
}

const displayCollection = (coll) => {
    const markup = `
        <div  data-collid=${coll.id} class="collections__list__item">
              <a href="#collection=${coll.id}" class="collections__list__item__name">
                <p>${coll.name}</p>
              </a>
              <a href="#" class="delete__coll__btn">
                <ion-icon
                  class="delete__collection collections__list__item__icon"
                  name="trash"
                ></ion-icon>
              </a>
            </div>

    `;
    return markup;
}

export const displayColl = (collections) => {
    collections.forEach(el => {
        elements.collections.insertAdjacentHTML('beforeend', displayCollection(el))
    })
}



// data