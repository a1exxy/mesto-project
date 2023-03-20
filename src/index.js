import './pages/index.css' // подключение корня стилей

import {addCloseFunction, } from './components/modal.js'
import {newCard, initialAddCards} from './components/card.js'
import editProfile from "./components/profile.js";
import enableValidation from './components/validate.js'

addCloseFunction() // Добавление обработчеков закрытия попапов
newCard()          // Включение формы добавления карточки места
editProfile()      // Включение формы правки профиля
initialAddCards()  // Загрузка первоначальных карточек

// Включение валидации для формы правки профиля
enableValidation(
  '.profile-editor',
  '.popup__text-input',
  '.popup__save-button',
  'popup__save-button_deactivate',
  'popup__text-input_invalid',
  'popup__text-input-error_active'
)

// Включение валидации для формы новое место
enableValidation(
  '.newplace-form',
  '.popup__text-input',
  '.popup__save-button',
  'popup__save-button_deactivate',
  'popup__text-input_invalid',
  'popup__text-input-error_active'
)

// Проверка переменных окружения
console.log(`API_URL: ${process.env.BACKEND_API_URL}`)
console.log(`API_TOKEN: ${process.env.BACKEND_API_TOKEN.slice(0,5)}...${process.env.BACKEND_API_TOKEN.slice(-5)}`)

//---------------------------------------------------------------
