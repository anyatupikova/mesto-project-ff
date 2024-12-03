// вводные данные
// 1) запрос
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: 'a6f7218f-bc70-427c-9a54-a745f1f6328d',
    'Content-Type': 'application/json'
  }
}

// 2) ответ
export const returnResponse = async (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// получение информации о пользователе с сервера
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(returnResponse);
}

// Метод PATCH - для частичного обновления информации
// здесь - о пользователе
// редактирование профиля с запросом
export const editProfile = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about
    })
  })
    .then(returnResponse);
}

// получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(returnResponse);
}

// метод POST - отправка данных на сервер
// отправление новой карточки
export const addCardRequest = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then(returnResponse);
}

// удаление карточки
export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(returnResponse);
};

// метод PUT - для полной замены информации на новую
// постановка лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(returnResponse);
}

// // удаление лайка
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(returnResponse);
}

// редактирование аватара профиля
export const editAvatarRequest = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(returnResponse);
};