

// создание карточки
export const generateCard = ({ name, link }, deleteCard, likeCard, openPopupImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  const resetButton = cardElement.querySelector('.card__delete-button');
  resetButton.addEventListener('click', deleteCard);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => likeCard(evt));
  cardImage.addEventListener('click', () => {
    openPopupImage(name, link);
  });
  return cardElement;
};

export const deleteCard = (evt) => {
  evt.target.closest('.places__item').remove();
};

export const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};