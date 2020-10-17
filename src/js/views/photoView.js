import { elements } from './base';

const photoTag = (tag) => {
  const markup = `
  <li class="photo__tag">
    <a class="photo__tag__link" href="#search=${tag}&page=1">
      ${tag}
    </a>
  </li>
`;
  return markup;
}

const photoPage = (photo) => {
  let tags = photo.tags;
  tags = tags.map(el => photoTag(el));
  tags = tags.join('');

  console.log(tags);

  const markup = `
    
      <div class="photo__image">
        <a href="${photo.link}" target="_blank"><img
          src="${photo.src}"
          alt="${photo.description}"
        /></a>
      </div>
      <a class="photo__user" href="${photo.userLink}" target="_blank">@${photo.username}</a>
      <ul class="photo__tags">
        ${tags}
      </ul>
      <p class="photo__description">${photo.description}</p>
      <p class="photo__author">${photo.author}</p>

  `;

  return markup;
}

export const displayPhotoState = (photo) => {
  elements.photoState.insertAdjacentHTML('afterbegin', photoPage(photo));
}

export const clearPhotoState = () => {
  elements.photoState.innerHTML = '';
}

// 
