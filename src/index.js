import './pages/index.css' // подключение корня стилей

import {addCloseFunction} from './components/modal.js'
import {newCard, initialAddCards} from './components/card.js'
import editProfile from "./components/profile.js";
import {enableValidation} from './components/validate.js'
import {classes, selectors} from './components/consts.js'

addCloseFunction() // Добавление функции закрытия для попапов
newCard()          // Включение формы добавления карточки места
editProfile()      // Включение формы правки профиля
initialAddCards()  // Загрузка первоначальных карточек

// Включение валидации в формах
enableValidation(
  selectors.formSelector,
  selectors.inputSelector,
  selectors.submitButtonSelector,
  classes.inactiveButtonClass,
  classes.inputErrorClass,
  classes.errorActiveClass
)
