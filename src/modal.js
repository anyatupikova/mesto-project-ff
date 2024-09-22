const popupTypeImage = document.querySelector('.popup_type_image');

export const handleEscKeyUp = (e, modal) => {
  if (e.key === 'Escape') {
    closeModal(modal);
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  overlay.classList.add('overlay-opened');
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', (e) => handleEscKeyUp(e, modal));
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  overlay.classList.remove('overlay-opened');
  document.removeEventListener('keydown', (e) => handleEscKeyUp(e, modal));
};

export const openPopupImage = (name, link) => {
  const cardTemplate = document.querySelector('#card-template').content;
  popupTypeImage.classList.add('popup_is-animated');
  popupTypeImage.classList.add('popup_is-opened');
  overlay.classList.add('overlay-opened');
  document.addEventListener('keydown', (e) => handleEscKeyUp(e, popupTypeImage));
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  document.querySelector('.popup__image').src = link;
  document.querySelector('.popup__image').alt = name;
  document.querySelector('.popup__caption').textContent = name;
}