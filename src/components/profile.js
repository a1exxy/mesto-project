//           Изменение профайла

import {openPopup, closePopup} from './modal.js'
import {checkFormValidity} from './validate.js'
import {classes, selectors} from './consts.js'
import {setAvatar, updateUser} from "./api";
const editProfilePopup = document.querySelector('.popup-editprofile') // редактирование профайла
const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfileForm = document.querySelector('.profile-editor')
const editProfileName = document.querySelector('.editProfileName')
const editProfileAboutMe = document.querySelector('.editProfileAboutMe')
const profileName = document.querySelector('.profile__name') // профайл
const profileAboutMe = document.querySelector('.profile__about-me')
const profileAvatar = document.querySelector('.profile__avatar')
const profileAvatarBtn = profileAvatar.querySelector('.profile__avatar-btn')
const avatarUpdatePopup = document.querySelector('.popup-avatar')
const avatarLink = avatarUpdatePopup.querySelector('.avatarLink')
const avatarForm = avatarUpdatePopup.querySelector('.avatar-form')

const copyUserInfoToForm = () => {
  editProfileName.value = profileName.textContent
  editProfileAboutMe.value = profileAboutMe.textContent
}

const copyAvatarURLToForm = () => {
  avatarLink.value = profileAvatar.style.backgroundImage.slice(5,-2)
}

const renderUserInfo = (profileDate) => {
  profileName.textContent = profileDate.name
  profileAboutMe.textContent = profileDate.about
}

const renderAvatar = (profileDate) => {
  profileAvatar.style.backgroundImage = `url('${profileDate.avatar}')`
}

function initProfilePopup(){
  // Функция инициализации формы правки профайла
  // клик на кнопку правки профайла
  editProfileBtn.addEventListener('click',() => {
    copyUserInfoToForm()
    openPopup(editProfilePopup)
    checkFormValidity('.profile-editor', selectors.inputSelector, classes.inputErrorClass, classes.errorActiveClass)
  })

  // Сохранение в форме правки профайла
  editProfileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    Promise.resolve(updateUser(editProfileName.value, editProfileAboutMe.value))
      .then(res => { renderUserInfo(res) })
    closePopup(editProfilePopup)
    evt.submitter.textContent = 'Сохранить'
  });

  // клик на аватарку
  profileAvatarBtn.addEventListener('click', () => {
    copyAvatarURLToForm()
    openPopup(avatarUpdatePopup)
    checkFormValidity('.avatar-form', selectors.inputSelector, classes.inputErrorClass, classes.errorActiveClass)
  })

  // Сохранение аватарки
  avatarForm.addEventListener('submit', evt => {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    Promise.resolve(setAvatar(avatarLink.value))
      .then(res => {
        renderAvatar(res)
      })
    closePopup(avatarUpdatePopup)
    evt.submitter.textContent = 'Сохранить'
  });
}

// Отображение данных пользователя
function renderProfile(profileDate){
  renderUserInfo(profileDate)
  renderAvatar(profileDate)
  copyUserInfoToForm()
  copyAvatarURLToForm()
}

export {initProfilePopup, renderProfile}
