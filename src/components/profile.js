//           Изменение профайла

import {openPopup, closePopup} from './modal.js'
import {checkFormValidity} from './validate.js'
import {classes, selectors} from './consts.js'
const editProfilePopup = document.querySelector('.popup-editprofile') // редактирование профайла
const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfileForm = document.querySelector('.profile-editor')
const editProfileName = document.querySelector('.editProfileName')
const editProfileAboutMe = document.querySelector('.editProfileAboutMe')
const profileName = document.querySelector('.profile__name') // профайл
const profileAboutMe = document.querySelector('.profile__about-me')

function initProfilePopup(){
  editProfileBtn.addEventListener('click',() => {
    editProfileName.value = profileName.textContent
    editProfileAboutMe.value = profileAboutMe.textContent
    openPopup(editProfilePopup)
    checkFormValidity('.profile-editor', selectors.inputSelector, classes.inputErrorClass, classes.errorActiveClass)
  })

  editProfileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    if (editProfileName.value.length > 0 && editProfileAboutMe.value.length > 0) {
      profileName.textContent = editProfileName.value
      profileAboutMe.textContent = editProfileAboutMe.value
    }
    closePopup(editProfilePopup)
  });
}

export default initProfilePopup
