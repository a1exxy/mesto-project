import './pages/index.css' // подключение корня стилей

import {addCloseFunction} from './components/modal.js'
import {initCardPopupListeners, renderInitialCards} from './components/card.js'
import {initProfilePopup, renderProfile} from "./components/profile.js";
import {enableValidation} from './components/validate.js'
import {classes, selectors} from './components/consts.js'
import {getAllCards, getUserInfo} from './components/api.js'

addCloseFunction()         // Добавление функции закрытия для попапов

Promise.resolve(getUserInfo())// Запрос данных пользователя
  .then(res => {
      renderProfile(res) // Отображение данных пользователя
      initProfilePopup() // Включение формы правки профиля
      enableValidation(  // Включение валидации в формах
        selectors.formSelector,
        selectors.inputSelector,
        selectors.submitButtonSelector,
        classes.inactiveButtonClass,
        classes.inputErrorClass,
        classes.errorActiveClass
      )
      return Promise.resolve(res._id)
    }
  )
  .then(userId => {
      Promise.resolve(getAllCards()) // запрос всех карточек
      .then(cards => {
        renderInitialCards(cards, userId)
      }) // отображение всех карточек
      initCardPopupListeners(userId) // Включение формы добавления нового места
    }
  )








