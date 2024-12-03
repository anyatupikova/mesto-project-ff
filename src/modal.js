export const handleEscKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  overlay.classList.add('overlay-opened');
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', handleEscKeyUp);
  
  const popupNewCard = document.querySelector('.popup_type_new-card');
  const submitButtonSelector = popupNewCard.querySelector('.popup__button');
  submitButtonSelector.disabled = true;
  submitButtonSelector.classList.add('popup__button_disabled');
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  overlay.classList.remove('overlay-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};