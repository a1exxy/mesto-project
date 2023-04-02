// модуль взаимодействия с API

import {apiConfig} from "../config/api.cfg.js";

const sendRequest = (path,
                     method = 'GET',
                     body = null,
                     debug = false) => {
  // обертка над fetch
  const options = {
    method: method,
    headers: apiConfig.headers
  }
  if (body && ['POST', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(body)
  }
  if(debug) {
    console.log(`Run sendRequest(\n\nURL:${apiConfig.baseUrl + path},\nMETHOD:${method},\nBODY:${body},\n\n)`)
  }
  return fetch(apiConfig.baseUrl + path, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка сетевого взаимодействия: ${res.status}`);
    })
}

const getAllCards = () => {
  // Запрос всех карточек
  // GET https://{{URL}}/v1/{{COHORTID}}/cards
  return sendRequest('/cards').then(data => data)
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

const updateUser = (name, about) => {
  // обновление пользователя
  // PATCH https://{{URL}}/v1/{{COHORTID}}/users/me
  //   {
  //     "name": "Иван Иванов",
  //     "about": "Тестовый юнит"
  //   }
  return sendRequest('/users/me','PATCH', {name: name, about:about})
}

const setAvatar = (avatarURL) => {
  // изменение аватарки пользователя
  // PATCH https://{{URL}}/v1/{{COHORTID}}/users/me/avatar
  //   { "avatar": "https://fastly.picsum.photos/id/310/700/700.jpg?hmac=ijt0q0p48Ew5wBBl83h2cUlty5RhVdmSU2IeYVl_ynQ" }
  return sendRequest('/users/me/avatar', 'PATCH', {avatar:avatarURL})
}

const getUserInfo = () => {
  // запрос информации о пользователе
  // GET https://{{URL}}/v1/{{COHORTID}}/users/me
  return sendRequest('/users/me')
}

export {getAllCards, updateUser, setAvatar, addCard, delCard, setLike, delLike, getUserInfo }

