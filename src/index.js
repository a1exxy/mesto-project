import './pages/index.css' // подключение корня стилей

import {addCloseFunction} from './components/modal.js'
import {initCardPopupListeners, renderInitialCards} from './components/card.js'
import {initProfilePopup, renderProfile} from "./components/profile.js";
import {enableValidation} from './components/validate.js'
import {classes, selectors} from './components/consts.js'
import {getAllCards, getUserInfo} from './components/api.js'

addCloseFunction()         // Добавление функции закрытия для попапов

Promise.all([getUserInfo(),getAllCards()]) // Запрос данных пользователя + запрос всех карточек
  .then(([info, initialCards])=>{
    renderProfile(info) // Отображение данных пользователя
    initProfilePopup() // Включение формы правки профиля
    enableValidation(  // Включение валидации в формах
      selectors.formSelector,
      selectors.inputSelector,
      selectors.submitButtonSelector,
      classes.inactiveButtonClass,
      classes.inputErrorClass,
      classes.errorActiveClass
    )
    renderInitialCards(initialCards, info._id) // отображение всех карточек
    initCardPopupListeners(info._id) // Включение формы добавления нового места
  })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`))







