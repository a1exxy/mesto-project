// модуль взаимодействия с API

import {apiConfig} from "../config/api.cfg.js";

const sendRequest = (url, method = 'GET', body = null) => {
  // обертка над fetch
  let options = {
    method: method,
    headers: apiConfig.headers
  }
  if (body && ['POST', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(body)
  }
  return fetch(apiConfig.baseUrl + url, options)
    .then(res => {
      if (res.ok) {
        res.json()
      }
      return Promise.reject(`Ошибка сетевого взаимодействия: ${res.status}`);
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}

const getAllCards = () => {
  // Запрос всех карточек
  // GET https://{{URL}}/v1/{{COHORTID}}/cards
  return sendRequest('/cards')
}

const addCard = (name, link) => {
  // Добовление карточки
  // POST https://{{URL}}/v1/{{COHORTID}}/cards
  //   {
  //     "name": "Луг",
  //     "link": "https://fastly.picsum.photos/id/94/700/700.jpg?hmac=LDTYq_CW39LVtcw8d1l-0nfdrGWBlRsVaz68wiqUyPg"
  //   }
  return sendRequest('/cards', 'POST', {name: name, link: link})
}

const delCard = (cardID) => {
  // Удаление карточки
  // DELETE https://{{URL}}/v1/{{COHORTID}}/cards/{{cardID}}
  return sendRequest(`/cards/${cardID}`, 'DELETE')
}

const setLike = (cardID) => {
  // Установка лайка
  // PUT https://{{URL}}/v1/{{COHORTID}}/cards/likes/{{cardID}}
  return sendRequest(`/cards/likes/${cardID}`, 'PUT')
}

const delLike = (cardID) => {
  // Удаление лайка
  // DELETE https://{{URL}}/v1/{{COHORTID}}/cards/likes/{{cardID}}
  return sendRequest(`/cards/likes/${cardID}`, 'DELETE')
}

const getUser = () => {
  // запрос пользователя
  // GET https://{{URL}}/v1/{{COHORTID}}/users/me
  return sendRequest('/users/me')
}

const updateUser = (name, about) => {
  // обновление пользователя
  // PATCH https://{{URL}}/v1/{{COHORTID}}/users/me
  //   {
  //     "name": "Иван Иванов",
  //     "about": "Тестовый юнит"
  //   }
  return sendRequest('/users/me','PATCH', {name: name, about:about})
}

const setAvatar = (avatar) => {
  // изменение аватарки пользователя
  // PATCH https://{{URL}}/v1/{{COHORTID}}/users/me/avatar
  //   { "avatar": "https://fastly.picsum.photos/id/310/700/700.jpg?hmac=ijt0q0p48Ew5wBBl83h2cUlty5RhVdmSU2IeYVl_ynQ" }
  return sendRequest('/users/me/avatar', 'PATCH', {avatar:avatar})
}

export {getAllCards, getUser, updateUser, setAvatar, addCard, delCard, setLike, delLike }

