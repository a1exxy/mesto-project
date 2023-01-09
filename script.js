// Временный скрипт для тестирования попапа
function popup_visible () {
  let popup = document.getElementById('popup')
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened")
  }
  else {
    popup.classList.add("popup_opened")
  }
}

document.getElementById('profile__edit-button').addEventListener('click', popup_visible)
document.getElementById('popup__save-button').addEventListener('click', popup_visible)
document.getElementById('popup__close-button').addEventListener('click', popup_visible)
