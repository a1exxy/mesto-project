// Модуль карточек

import {openPopup, closePopup} from './modal.js'
import {addCard, delCard, setLike, delLike} from './api.js'

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
const confirmPopup = document.querySelector('.popup-confirm')
const confirmForm = confirmPopup.querySelector('.confirm-form')

const removeCard = (confirmPopup, confirmForm, card) => {
  Promise.resolve(delCard(card.dataset.id))
  .then(() => {
    card.remove()
    confirmForm.removeEventListener('submit', removeCard)
    closePopup(confirmPopup)
  })
}

function buildCard(name, link, ownerId, userId, cardId, likes){
  // Функция создания карточки
  // возвращает объект карточки
  const card = elementTemplate.querySelector('.element').cloneNode(true)
  const elementImg = card.querySelector('.element__img')
  const trash = card.querySelector('.element__trash')
  const likesCount = card.querySelector('.element__likes-count')
  const likeBtn = card.querySelector('.element__link')
  likesCount.textContent = likes.length
  likes.forEach(elem => { // Поиск своих лайков
    if(elem._id === userId) { likeBtn.classList.add('element__link_active') }
  })
  elementImg.src = link
  elementImg.alt = "Изображение " + name
  card.setAttribute('data-id', cardId)
  card.querySelector('.element__title').textContent = name
  card.querySelector('.element__link').addEventListener('click', evt => { // Лайки
    if(evt.target.classList.contains('element__link_active')){
      Promise.resolve(delLike(card.dataset.id))
        .then(()=>{
          evt.target.classList.toggle('element__link_active')
          likesCount.textContent = Number(likesCount.textContent) - 1
        })
    } else {
      Promise.resolve(setLike(card.dataset.id))
        .then(() => {
          evt.target.classList.toggle('element__link_active')
          likesCount.textContent = Number(likesCount.textContent) + 1
        })
    }
  })
  if(ownerId === userId) { // Удаление карточки
    const removeCardHandler = () => {
      Promise.resolve(delCard(card.dataset.id))
      .then(() => {
        card.remove()
        confirmForm.removeEventListener('submit', removeCardHandler)
        closePopup(confirmPopup)
      })
    }
    trash.addEventListener('click', () => {
      openPopup(confirmPopup)
      confirmForm.addEventListener('submit', removeCardHandler)
    })
  }
  else {
    trash.hidden = true
  }
  card.querySelector('.element__show').addEventListener('click', () => {
    imageTitle.textContent = name
    image.alt = "Изображение " + name
    image.src = link
    openPopup(imagePopup)
  })
  return card
}

function initCardPopupListeners(userId){
  //  Добавление карточек

  // Кнопка открытия диалога добавления нового места
  newPlaceBtn.addEventListener('click',() => {
    openPopup(newPlacePopup)
  })

  // Кнопка сохранить в форме добавления нового места
  newPlaceForm.addEventListener('submit', evt => {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    Promise.resolve(addCard(newPlaceName.value, newPlaceURL.value))
      .then(res => { elements.prepend(buildCard(res.name, res.link, res.owner._id, userId, res._id, res.likes)) })
    evt.target.reset()
    closePopup(newPlacePopup)
    evt.submitter.textContent = 'Сохранить'
  })
}

function renderInitialCards(initialCards, userId) {
   // Первичное добавление карточек
  initialCards.forEach(elem => {
    elements.append(buildCard(elem.name, elem.link, elem.owner._id, userId, elem._id, elem.likes))
  })
}

export {initCardPopupListeners, renderInitialCards}

