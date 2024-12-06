import { addLike, removeLike, deleteCardRequest } from './api.js';

// создание карточки
export const generateCard = (card, userId, deleteCard, likeCard, openPopupImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const numberLike = cardElement.querySelector('.number__likes');

  // элементы карточки
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // удаление карточки
  const resetButton = cardElement.querySelector('.card__delete-button');
  if (userId === card.owner._id) {
    resetButton.addEventListener('click', () => deleteCard(card, cardElement));
  } else {
    resetButton.classList.add('card__delete-button-inactive');
  }

  // лайки
  countingLikes(card, numberLike); // изначальные номера отобразить
  const likeButton = cardElement.querySelector('.card__like-button');
  // есть ли среди изначальных лайков мои
  if (card.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  };
  likeButton.addEventListener('click', () => {
    likeCard(card, likeButton, numberLike);
  });

  // обработчик открытия попапа картинки
  cardImage.addEventListener('click', () => {
    openPopupImage(card);
  });
  
  return cardElement;
};

export const deleteCard = (card, cardElement) => {
  // evt.target.closest('.places__item').remove();
  const cardId = card._id;

  deleteCardRequest(cardId)
    .then(() => {
      cardElement.remove(); // Удаляем карточку с вёрстки после успешного удаления на сервере
    })
    .catch((err) => {
      console.error(err);
    });
};

// окрашивание лайка
export const colorLike = (evt) => {
  evt.classList.toggle('card__like-button_is-active');
};

// // подсчет лайков
export const countingLikes = (card, number) => {
  number.textContent = card.likes.length;
}

// // функционирование лайка
export const likeCard = (card, like, number) => {
  const cardId = card._id;
  const classLike = like.classList.contains('card__like-button_is-active');

  const apiCall = classLike ? removeLike : addLike;

  apiCall(cardId)
    .then((updatedCard) => { // обновленные данные с сервера
      colorLike(like);
      countingLikes(updatedCard, number);
    })
    .catch((err) => {
      console.error(err);
    });
}