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

let deleteCandidateCard = null
let deleteCandidateCardId = null

const deleteCard = evt => { // обработчик подтверждения удаления карточки
  evt.preventDefault();
  delCard(deleteCandidateCardId)
  .then(() => {
    deleteCandidateCard.remove()
    closePopup(confirmPopup)
  })
  .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
}

document.addEventListener('cancel', evt => { // снятие обработчика удаления, если подтверждение закрыто
  if(evt.target.classList.contains('popup-confirm')){
    confirmForm.removeEventListener('submit', deleteCard)
  }
})

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
  card.querySelector('.element__title').textContent = name
  card.querySelector('.element__link').addEventListener('click', evt => { // Лайки
    if(evt.target.classList.contains('element__link_active')){
      delLike(cardId)
        .then(() => {
          evt.target.classList.toggle('element__link_active')
          likesCount.textContent = Number(likesCount.textContent) - 1
        })
        .catch(err => console.log(`Ошибка удаления лайка: ${err}`))
    } else {
      setLike(cardId)
        .then(() => {
          evt.target.classList.toggle('element__link_active')
          likesCount.textContent = Number(likesCount.textContent) + 1
        })
        .catch(err => console.log(`Ошибка добавления лайка: ${err}`))
    }
  })
  if(ownerId === userId) { // Удаление карточки
    trash.addEventListener('click', () => { // открытие подтверждения удаления карточки
      deleteCandidateCard = card
      deleteCandidateCardId = cardId
      openPopup(confirmPopup)
      confirmForm.addEventListener('submit', deleteCard, {once: true})
    })
  }
  else {
    trash.hidden = true
  }
  card.querySelector('.element__show').addEventListener('click', () => { // просмотр изображения
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
    evt.submitter.textContent = 'Сохранение...' // протестировать с помощью тротленга не удалось, похоже надо тормозить бек что бы это проверить
    addCard(newPlaceName.value, newPlaceURL.value)
      .then(res => {
        elements.prepend(buildCard(res.name, res.link, res.owner._id, userId, res._id, res.likes))
        evt.target.reset()
        closePopup(newPlacePopup)
      })
      .catch(err => console.log(`Ошибка добовления карточки: ${err}`))
      .finally(evt.submitter.textContent = 'Сохранить')
  })
}

function renderInitialCards(initialCards, userId) {
   // Первичное добавление карточек
  initialCards.forEach(elem => {
    elements.append(buildCard(elem.name, elem.link, elem.owner._id, userId, elem._id, elem.likes))
  })
}

export {initCardPopupListeners, renderInitialCards}

