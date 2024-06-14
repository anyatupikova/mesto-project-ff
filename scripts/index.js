// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function generateCard (element, deleteCard) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  const resetButton = cardElement.querySelector('.card__delete-button');
  resetButton.addEventListener('click', deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const cardElement = generateCard(element, deleteCard);
  cardsContainer.append(cardElement);
})
