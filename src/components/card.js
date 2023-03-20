// Модуль карточек

import {openPopup, closePopup} from './modal.js'
import {initialCards} from '../config/local-start.cfg.js'

const newPlaceForm = document.querySelector('.newplace-form')
const newPlaceBtn =  document.querySelector('.profile__add-button')
const newPlacePopup = document.querySelector('.popup-newplace') // Добавление нового места
const newPlaceName = document.querySelector('.newPlaceName')
const newPlaceURL = document.querySelector('.newPlaceURL')
const elements = document.querySelector('.elements') // Контейнер для карточек
const elementTemplate = document.querySelector('.element-template').content  // Шаблон карточки
const imagePopup = document.querySelector('.popup-img') // просмотр картинки
const imageTitle = imagePopup.querySelector('.popup__caption')
const image = imagePopup.querySelector('.popup__view')

function buildCard(name, link){
  // Функция создания карточки
  // возвращает объект карточки
  const card = elementTemplate.querySelector('.element').cloneNode(true)
  card.querySelector('.element__img').src = link
  card.querySelector('.element__img').alt = "Изображение " + name
  card.querySelector('.element__title').textContent = name
  card.querySelector('.element__link').addEventListener('click', evt => {
    evt.target.classList.toggle('element__link_active')
  })
  card.querySelector('.element__trash').addEventListener('click', evt => {
    evt.target.closest('.element').remove()
  })
  card.querySelector('.element__show').addEventListener('click', evt => {
    const title = evt.target.closest('.element').querySelector('.element__title').textContent
    imageTitle.textContent = title
    image.alt = "Изображение " + title
    image.src = evt.target.src
    openPopup(imagePopup)
  })
  return card
}

function newCard(){
  //  Добавление карточек

  // Кнопка открытия диалога добавления нового места
  newPlaceBtn.addEventListener('click',() => {
    openPopup(newPlacePopup)
  })

  // Кнопка сохранить в форме добавления новго места
  newPlaceForm.addEventListener('submit', evt => {
    evt.preventDefault();
    if (newPlaceName.value.length > 0 && newPlaceURL.value.length > 0) {
      elements.prepend(buildCard(newPlaceName.value, newPlaceURL.value))
    }
    evt.target.reset()
    closePopup(newPlacePopup)
  })
}

function initialAddCards() {
   // Первичное добавление карточек
  initialCards.forEach(elem => {
    elements.append(buildCard(elem.name, elem.link))
  })
}

export {newCard, initialAddCards}

