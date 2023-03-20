// Модальные окна

function openPopup(target) {
  // функция открытия модального окна
  target.classList.add('popup_opened')
}

function closePopup(target) {
  // функция закрытия модального окна
  target.classList.remove('popup_opened')
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

    popup.addEventListener('keydown', (evt) => {
    // закрытие попапов при нажатии Esc
      if (evt.code === 'Escape') {
        closePopup(evt.target.closest('.popup'))
      }
    })

  })
}

export {openPopup, closePopup, addCloseFunction}
