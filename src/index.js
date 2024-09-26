// импорт стилей css
import '../pages/index.css';

// импорт функций
import { handleEscKeyUp, openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';
import { generateCard, deleteCard, likeCard } from './card.js';

// общие объекты
const overlay = document.querySelector('.overlay');

// попап редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// попап добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.places__list');
const popupName = popupNewCard.querySelector('.popup__input_type_card-name');
const popupUrl = popupNewCard.querySelector('.popup__input_type_url');

// попап картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');


// добавление карточки
const addCard = (evt) => {
  evt.preventDefault();
  const imageValue = popupName.value;
  const urlValue = popupUrl.value;
  const cardElement = generateCard({ name: imageValue, link: urlValue }, deleteCard, likeCard, openPopupImage);
  cardsContainer.prepend(cardElement);
  closeModal(popupNewCard);
};

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
popupEdit.addEventListener('submit', (evt) => handleProfileFormSubmit(evt));

addListener(popupEdit);
addListener(popupNewCard);
addListener(popupTypeImage);

// обработчики клика по попапу
editButton.addEventListener('click', (evt) => {
  if (evt.target === editButton) {
    openModal(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent; 
  }
});

addButton.addEventListener('click', (evt) => {
  if (evt.target === addButton) {
    openModal(popupNewCard);
  }
});

// редактирование профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  console.log(nameValue);
  const jobValue = jobInput.value;
  console.log(jobValue);
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(popupEdit);
};

const openPopupImage = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
};

// вывести карточки на страницу
initialCards.forEach(element => {
  const cardElement = generateCard(element, deleteCard, likeCard, openPopupImage);
  cardsContainer.append(cardElement);
});