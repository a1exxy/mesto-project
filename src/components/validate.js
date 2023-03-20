// Валидация форм

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorActiveClass) {
  // Функция отображения ошибки поля
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`) // Находим элемент ошибки внутри самой функции
  inputElement.classList.add(inputErrorClass)
  errorElement.classList.add(errorActiveClass)
  errorElement.textContent = errorMessage
}

function hideInputError(formElement, inputElement, inputErrorClass, errorActiveClass) {
  // Функция скрытия ошибки поля
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`) // Находим элемент ошибки
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorActiveClass)
  errorElement.textContent = ''
}

function hasInvalidInput(inputList) {
  // Функция проверки корректности всех полей в форме
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  // Функция отключение кнопки сохранения
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true
    buttonElement.classList.add(inactiveButtonClass)
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false
    buttonElement.classList.remove(inactiveButtonClass)
  }
}

function isValid(formElement, inputElement, inputErrorClass, errorActiveClass) {
  // Функция валидации одного поля
  if (inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage) // Если не прошел паттерн => ошибка из поля data-error-message
  } else {
    inputElement.setCustomValidity("") // если не паттерн => стандартные ошибки
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorActiveClass)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorActiveClass)
  }
}

function enableValidation (formSelector, inputSelector, submitButtonSelector,
                           inactiveButtonClass, inputErrorClass, errorActiveClass) {
  // Функция валидации форм
  const formElement = document.querySelector(formSelector)
  const submitElement = formElement.querySelector(submitButtonSelector)
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  // Валидация полей
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorActiveClass)
    })
  })
  // Отключение кнопки сохраненния
  toggleButtonState(inputList, submitElement, inactiveButtonClass)
  formElement.addEventListener('input', () => {
    toggleButtonState(inputList, submitElement, inactiveButtonClass)
  })
}

export default enableValidation
