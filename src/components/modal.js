// Модальные окна

const handleEscBtn = (evt) => {
  // Закрытие по Esc
  if (evt.code === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

const closePopup = (popup) => {
  // функция закрытия модального окна
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleEscBtn)
}

const openPopup = (popup) => {
  // функция открытия модального окна
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', handleEscBtn)
}

function addCloseFunction() {
  // Закрытие попапов
  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      // Для информации: в yandex_browser и firefox под ubuntu воспроизвести багу с click не удалось - работает и так и так...
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
      }
    })
  })
}

export {openPopup, closePopup, addCloseFunction}
