//           Изменение профайла

import {openPopup, closePopup} from './modal.js'
const editProfilePopup = document.querySelector('.popup-editprofile') // редактирование профайла
const editProfileBtn = document.querySelector('.profile__edit-button')
const editProfileForm = document.querySelector('.profile-editor')
const editProfileName = document.querySelector('.editProfileName')
const editProfileAboutMe = document.querySelector('.editProfileAboutMe')
const ProfileName = document.querySelector('.profile__name') // профайл
const ProfileAboutMe = document.querySelector('.profile__about-me')

function editProfile(){
  editProfileBtn.addEventListener('click',() => {
    editProfileName.value = ProfileName.textContent
    editProfileAboutMe.value = ProfileAboutMe.textContent
    openPopup(editProfilePopup)
  })

  editProfileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    if (editProfileName.value.length > 0 && editProfileAboutMe.value.length > 0) {
      ProfileName.textContent = editProfileName.value
      ProfileAboutMe.textContent = editProfileAboutMe.value
    }
    closePopup(editProfilePopup)
  });
}

export default editProfile
