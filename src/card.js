const popupNewCard = document.querySelector('.popup_type_new-card');
const cardsContainer = document.querySelector('.places__list');

import { closeModal, openPopupImage } from "./modal.js";

// добавление карточки
export const addCard = (evt) => {
    evt.preventDefault();
    const popupImage = popupNewCard.querySelector('.popup__input_type_card-name');
    const popupUrl = popupNewCard.querySelector('.popup__input_type_url');
    const imageValue = popupImage.value;
    const urlValue = popupUrl.value;
    const cardElement = generateCard({ name: imageValue, link: urlValue }, deleteCard, likeCard);
    cardsContainer.prepend(cardElement);
    closeModal(popupNewCard);
}

// создание карточки
export const generateCard = ({ name, link }, deleteCard, likeCard) => {
    const cardTemplate = document.querySelector('#card-template').content;
    let cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
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
    })
    return cardElement;
}

export const deleteCard = (evt) => {
    evt.target.closest('.places__item').remove();
}

export const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}