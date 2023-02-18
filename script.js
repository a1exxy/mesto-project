// начальные данные для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const Elements = document.querySelector('.elements') // контейнер для карточек
const newPlacePopup = document.querySelector('.popup-newplace') // Добавление нового места
const newPlaceAddButton = document.querySelector('.profile__add-button')
const newPlaceCloseButton = document.querySelector('.popup-newplace__close-button')
const newPlaceForm = document.querySelector('.popup-newplace__inputs')
const newPlaceName = document.getElementById('newPlaceName')
const newPlaceURL = document.getElementById('newPlaceURL')
const editProfilePopup = document.querySelector('.popup') // редактирование профайла
const editProfileButton = document.querySelector('.profile__edit-button')
const editProfileForm = document.querySelector('.popup__inputs')
const editProfilePopupCloseButton = document.querySelector('.popup__close-button')
const editProfileName = document.getElementById('editProfileName')
const editProfileAboutMe = document.getElementById('editProfileAboutMe')
const ProfileName = document.querySelector('.profile__name') // профайл
const ProfileAboutMe = document.querySelector('.profile__about-me')
const popupImg = document.querySelector('.popup-img') // просмотр картинки
const popupImgCloseBtn = document.querySelector('.popup-img__close-button')
function buildCard(name, link){
  // Функция создания карточки
  // возвращает объект карточки
  const elementTemplate = document.querySelector('.element-template').content
  const card = elementTemplate.querySelector('.element').cloneNode(true)
  card.querySelector('.element__img').src = link
  card.querySelector('.element__img').alt += name
  card.querySelector('.element__title').textContent = name
  card.querySelector('.element__link').addEventListener('click', evt => {
    evt.target.classList.toggle('element__link_active')
  })
  card.querySelector('.element__trash').addEventListener('click', evt => {
    evt.target.closest('.element').remove()
  })
  card.querySelector('.element__show').addEventListener('click', evt => {
    const title = evt.target.closest('.element').querySelector('.element__title').textContent
    popupImg.querySelector('.popup-img__caption').textContent = title
    const img = popupImg.querySelector('.popup-img__view')
    img.src = evt.target.src
    img.alt += title
    popupImg.classList.add('popup-img_opened')
  })
  return card
}
//---------------------------------------------------------------
// первичное добавление карточек
initialCards.forEach(elem => {
  Elements.append(buildCard(elem.name, elem.link))
})
//---------------------------------------------------------------
// Закрытие картинки
popupImgCloseBtn.addEventListener('click',() => {
  popupImg.classList.remove('popup-img_opened')
})
//---------------------------------------------------------------
// Добавление карточек
newPlaceAddButton.addEventListener('click',() => {
  newPlacePopup.classList.add('popup-newplace_opened')
})

newPlaceCloseButton.addEventListener('click',() => {
  newPlacePopup.classList.remove('popup-newplace_opened')
})

newPlaceForm.addEventListener('submit', evt => {
  evt.preventDefault();
  if (newPlaceName.value.length > 0 && newPlaceURL.value.length > 0) {
    Elements.prepend(buildCard(newPlaceName.value, newPlaceURL.value))
  }
  newPlaceName.value = ''
  newPlaceURL.value = ''
  newPlacePopup.classList.remove('popup-newplace_opened')
})
//---------------------------------------------------------------
// Изменение профайла
editProfileButton.addEventListener('click',() => {
  editProfileName.value = ProfileName.textContent
  editProfileAboutMe.value = ProfileAboutMe.textContent
  editProfilePopup.classList.add('popup_opened')
})

editProfilePopupCloseButton.addEventListener('click', () => {
   editProfilePopup.classList.remove('popup_opened')
})

editProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  ProfileName.textContent = editProfileName.value
  ProfileAboutMe.textContent = editProfileAboutMe.value
  editProfilePopup.classList.remove('popup_opened')
});
