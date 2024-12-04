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
const popupEditForm = popupEdit.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
const buttonSubmitPopupEdit = popupEdit.querySelector('.popup__button');

// попап аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form');
const profileImage = document.querySelector('.profile__image');
const avatarInput = popupEditAvatar.querySelector('.popup__input_type_url');
const buttonSubmitPopupEditAvatar = popupEditAvatar.querySelector('.popup__button');

// попап добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.places__list');
const popupName = popupNewCard.querySelector('.popup__input_type_card-name');
const popupUrl = popupNewCard.querySelector('.popup__input_type_url');
const buttonSubmitPopupNewCard = popupNewCard.querySelector('.popup__button');

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
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = user.avatar;

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

  loadingInfo(buttonSubmitPopupNewCard, 'Сохранение...');

  addCardRequest(newCard)
    .then((res) => {
      cardsContainer.prepend(generateCard(res, userId, deleteCard, likeCard, openPopupImage));
      closeModal(popupNewCard);
      popupNewCardForm.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => loadingInfo(buttonSubmitPopupNewCard, 'Сохранить'))
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

popupNewCardForm.addEventListener('submit', addCard);
popupEditForm.addEventListener('submit', (evt) => handleProfileFormSubmit(evt));
popupEditAvatarForm.addEventListener('submit', handleEditAvatar);

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
  popupNewCardForm.reset();
  clearValidation(popupNewCard, validationConfig);
});

// слушатель открытия popupEditAvatar
profileImage.addEventListener('click', () => {
  openModal(popupEditAvatar);
  popupEditAvatarForm.reset();
  clearValidation(popupEditAvatar, validationConfig);
});

//редактирование аватара
function handleEditAvatar(evt) {
  evt.preventDefault();

  loadingInfo(buttonSubmitPopupEditAvatar, 'Сохранение...');

  editAvatarRequest(avatarInput.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupEditAvatar);
      popupEditAvatarForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => loadingInfo(buttonSubmitPopupEditAvatar, 'Сохранить'))
};

// редактирование профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  loadingInfo(buttonSubmitPopupEdit, 'Сохранение...');

  editProfile({ name: nameValue, about: jobValue })
    .then(() => {
      profileTitle.textContent = nameValue;
      profileDescription.textContent = jobValue;
      closeModal(popupEdit);
    })
    .catch((err) => console.error(err))
    .finally(() => loadingInfo(buttonSubmitPopupEdit, 'Сохранить'))
};

// открытие popupTypeImage
const openPopupImage = (card) => {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
};

const loadingInfo = (button, text) => {
  button.textContent = text;
}

enableValidation(validationConfig); 