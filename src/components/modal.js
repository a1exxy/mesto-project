// Модальные окна

const handlerEscBtn = (evt) => {
  // Закрытие по Esc
  if (evt.code === 'Escape') {
    const opened_popup = document.querySelector('.popup_opened')
    closePopup(opened_popup)
  }
}

const closePopup = (popup) => {
  // функция закрытия модального окна
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', handlerEscBtn)
}

const openPopup = (popup) => {
  // функция открытия модального окна
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', handlerEscBtn)
}

function addCloseFunction() {
  // Закрытие попапов
  document.querySelectorAll('.popup__close-button').forEach((btn) => {
    // Добавление функций закрытия для крестиков всех попапов
    btn.addEventListener('click',evt => {
      closePopup(evt.target.closest('.popup'))
    })
  })
  document.querySelectorAll('.popup').forEach((popup) => {
    // закрытие попапов при клие на пустое место
    popup.addEventListener('click', evt => {
      closePopup(evt.target)
    })
  })
}

export {openPopup, closePopup, addCloseFunction}
