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

const elements = document.querySelector('.elements') // Контейнер для карточек
const elementTemplate = document.querySelector('.element-template').content  // Шаблон карточки
const newPlacePopup = document.querySelector('.popup-newplace') // Добавление нового места
const newPlaceName = document.querySelector('.newPlaceName')
const newPlaceURL = document.querySelector('.newPlaceURL')
const newPlaceBtn =  document.querySelector('.profile__add-button')
const newPlaceForm = document.querySelector('.newplace-form')
const editProfilePopup = document.querySelector('.popup-editprofile') // редактирование профайла
const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfileForm = document.querySelector('.profile-editor')
const editProfileName = document.querySelector('.editProfileName')
const editProfileAboutMe = document.querySelector('.editProfileAboutMe')
const ProfileName = document.querySelector('.profile__name') // профайл
const ProfileAboutMe = document.querySelector('.profile__about-me')
const imagePopup = document.querySelector('.popup-img') // просмотр картинки
const imageTitle = imagePopup.querySelector('.popup__caption')
const image = imagePopup.querySelector('.popup__view')
function openPopup(target) {
  // функция открытия модального окна
  target.classList.add('popup_opened')
}

function closePopup(target) {
  // функция закрытия модального окна
  target.classList.remove('popup_opened')
}

function buildCard(name, link){
  // Функция создания карточки
  // возвращает объект карточки
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
    imageTitle.textContent = title
    image.alt = "Изображение " + title
    image.src = evt.target.src
    openPopup(imagePopup)
  })
  return card
}

//---------------------------------------------------------------
//          Первичное добавление карточек

initialCards.forEach(elem => {
  elements.append(buildCard(elem.name, elem.link))
})
//---------------------------------------------------------------
//          Добавление функций закрытия для крестиков всех попапов
document.querySelectorAll('.popup__close-button').forEach((btn) => {
  btn.addEventListener('click',evt => {
    closePopup(evt.target.closest('.popup'))
  })
})

//---------------------------------------------------------------
//           Добавление карточек

newPlaceBtn.addEventListener('click',() => {
  openPopup(newPlacePopup)
})

newPlaceForm.addEventListener('submit', evt => {
  evt.preventDefault();
  if (newPlaceName.value.length > 0 && newPlaceURL.value.length > 0) {
    elements.prepend(buildCard(newPlaceName.value, newPlaceURL.value))
  }
  evt.target.reset()
  closePopup(newPlacePopup)
})

//---------------------------------------------------------------
//           Изменение профайла

editProfileBtn.addEventListener('click',() => {
  editProfileName.value = ProfileName.textContent
  editProfileAboutMe.value = ProfileAboutMe.textContent
  openPopup(editProfilePopup)
})

editProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  ProfileName.textContent = editProfileName.value
  ProfileAboutMe.textContent = editProfileAboutMe.value
  closePopup(editProfilePopup)
});
