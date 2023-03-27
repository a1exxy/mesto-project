import './pages/index.css' // подключение корня стилей

import {addCloseFunction} from './components/modal.js'
import {initCardPopupListeners, renderInitialCards} from './components/card.js'
import initProfilePopup from "./components/profile.js";
import {enableValidation} from './components/validate.js'
import {classes, selectors} from './components/consts.js'

addCloseFunction() // Добавление функции закрытия для попапов
initCardPopupListeners()          // Включение формы добавления карточки места
initProfilePopup()      // Включение формы правки профиля
renderInitialCards()  // Загрузка первоначальных карточек

// Включение валидации в формах
enableValidation(
  selectors.formSelector,
  selectors.inputSelector,
  selectors.submitButtonSelector,
  classes.inactiveButtonClass,
  classes.inputErrorClass,
  classes.errorActiveClass
)
