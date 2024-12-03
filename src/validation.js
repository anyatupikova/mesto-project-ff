//добавляет класс форме
export const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  errorClass,
  inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // span с ошибкой
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass); // текст с ошибкой
    inputElement.classList.add(inputErrorClass); //красное подчеркивание
};

//удаляет класс с формы
export const hideInputError = (
  formElement,
  inputElement,
  errorClass,
  inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = ''; // убираем текст ошибки
    inputElement.classList.remove(inputErrorClass); // нет подчеркивания
  };

//проверяет форму на валидность и управляет функциями с классом
export const checkInputValidity = (
  formElement,
  inputElement,
  errorClass,
  inputErrorClass) => {
  // проверяет правильность символов и выводит текст ошибки
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
// управляет детальными знаками ошибок
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      errorClass,
      inputErrorClass);
  } else {
    hideInputError(
      formElement,
      inputElement,
      errorClass,
      inputErrorClass);
  }
};

// обработка всех инпатов внутри формы
export const setEventListeners = (
  formElement,
  inputElement,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
  inputErrorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputElement));
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(
          formElement,
          inputElement,
          errorClass,
          inputErrorClass);
        toggleButtonState(inputList, submitButton, inactiveButtonClass);
      });
  });
};

// обработка всех форм в DOM
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.errorClass,
      validationConfig.inputErrorClass);
  });
};

// проверяет, валидна ли форма для блокировки кнопки
export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  // Если поле не валидно, колбэк вернёт true
  // Обход массива прекратится и вся функция
  // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// стилизация кнопки "сохранить"
export const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
  // сделай кнопку неактивной
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  }
};

// очищение валидации формы
export const clearValidation = (formElement, validationConfig) => {
// 1) убираем текст ошибки 2) убираем подчеркивание
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  const inactiveButtonClass = formElement.querySelector(validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      validationConfig.errorClass,
      validationConfig.inputErrorClass);
    inputElement.setCustomValidity("");
    inputElement.removeEventListener('input', checkInputValidity);
  });

  // 3) активность кнопки "сохранить"
  toggleButtonState(inputList, submitButton, inactiveButtonClass);
};