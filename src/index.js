// импорт стилей css
import '../pages/index.css';

// импорт функций
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';
import { generateCard, deleteCard, likeCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUser, editProfile, getInitialCards, addCardRequest, editAvatarRequest } from './api.js';

// общие объекты
const overlay = document.querySelector('.overlay');
let userId = null;

// попап редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// попап аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const profileImage = document.querySelector('.profile__image');
const avatarInput = popupEditAvatar.querySelector('.popup__input_type_url');

// попап добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const formPopupNewCard = popupNewCard.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.places__list');
const popupName = popupNewCard.querySelector('.popup__input_type_card-name');
const popupUrl = popupNewCard.querySelector('.popup__input_type_url');

// попап картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', // активность кнопки
  inputErrorClass: 'popup__input_type_error', // подчеркивание
  errorClass: 'popup__error_visible' // текст
};

// вывести карточки на страницу
Promise.all([getUser(), getInitialCards()])
  .then(([user, initialCards]) => {
    userId = user._id;

    initialCards.forEach((card) => {
      const cardElement = generateCard(
        card,
        userId,
        deleteCard,
        likeCard,
        openPopupImage
      );
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// создание новой карточки
const addCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: popupName.value,
    link: popupUrl.value
  };

  const buttonSubmit = popupNewCard.querySelector('.popup__button');
  loadingInfo(buttonSubmit);

  addCardRequest(newCard)
    .then((res) => {
      cardsContainer.prepend(generateCard(res, userId, deleteCard, likeCard, openPopupImage));
      
      closeModal(popupNewCard);
      formPopupNewCard.reset();
    })
    .catch((err) => {
      console.error(err);
    });
};

// слушатели для popupNewCard и popupEdit
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
popupEditAvatar.addEventListener('submit', handleEditAvatar);

addListener(popupEdit);
addListener(popupNewCard);
addListener(popupTypeImage);
addListener(popupEditAvatar);

// слушатель открытия popupEdit
editButton.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
});

// слушатель открытия popupNewCard
addButton.addEventListener('click', () => {
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
  popupName.value  = '';
  popupUrl.value = '';
});

// слушатель открытия popupEditAvatar
profileImage.addEventListener('click', () => {
  clearValidation(popupEditAvatar, validationConfig);
  openModal(popupEditAvatar)
});

//редактирование аватара
function handleEditAvatar(evt) {
  evt.preventDefault();

  const buttonSubmit = popupEditAvatar.querySelector('.popup__button');
  loadingInfo(buttonSubmit);

  editAvatarRequest(avatarInput.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupEditAvatar);
      avatarInput.value = '';
    })
    .catch(err => console.log(err))
};

// редактирование профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const buttonSubmit = popupEdit.querySelector('.popup__button');
  loadingInfo(buttonSubmit);

  editProfile({ name: nameValue, about: jobValue })
    .then(() => {
      profileTitle.textContent = nameValue;
      profileDescription.textContent = jobValue;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error(err);
    });
};

// открытие popupTypeImage
const openPopupImage = (card) => {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
};

const loadingInfo = (button) => {
  button.textContent = 'Сохранение...';
}

enableValidation(validationConfig); 