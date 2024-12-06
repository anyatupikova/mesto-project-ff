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
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  overlay.classList.remove('overlay-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};