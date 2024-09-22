// импорт стилей css
import '../pages/index.css';

// импорт функций
import { handleEscKeyUp, openModal, closeModal, openPopupImage } from './modal.js';
import { initialCards } from './cards.js';
import { addCard, generateCard, deleteCard, likeCard } from './card.js';

// общие объекты
const overlay = document.querySelector('.overlay');

// попап редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// попап добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.places__list');

// попап картинки
const popupTypeImage = document.querySelector('.popup_type_image');

const addListener = (popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(popup);
  });
  overlay.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('overlay')) {
      closeModal(popup);
    }
  });
};

popupNewCard.addEventListener('submit', addCard);
popupEdit.addEventListener('submit', (evt) => handleFormSubmit(evt));

addListener(popupEdit);
addListener(popupNewCard);
addListener(popupTypeImage);

// обработчики клика по попапу
editButton.addEventListener('click', (evt) => {
  if (evt.target === editButton) {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    openModal(popupEdit);
  }
});

addButton.addEventListener('click', (evt) => {
  if (evt.target === addButton) {
    openModal(popupNewCard);
  }
});

// редактирование профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault(); 
  const nameValue = nameInput.value;
  console.log(nameValue);
  const jobValue = jobInput.value;
  console.log(jobValue);
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(popupEdit);
}

// вывести карточки на страницу
initialCards.forEach(element => {
  const cardElement = generateCard(element, deleteCard, likeCard);
  cardsContainer.append(cardElement);
});