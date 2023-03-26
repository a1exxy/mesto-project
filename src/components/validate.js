// Валидация форм

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorActiveClass) {
  // Функция отображения ошибки поля
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(inputErrorClass)
  errorElement.classList.add(errorActiveClass)
  errorElement.textContent = errorMessage
}

function hideInputError(formElement, inputElement, inputErrorClass, errorActiveClass) {
  // Функция скрытия ошибки поля
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
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

function activateSubmitBtn(buttonElement, inactiveButtonClass) {
  // Функция активации кнопки Сохранить
  buttonElement.disabled = false
  buttonElement.classList.remove(inactiveButtonClass)
}
function deactivateSubmitBtn(buttonElement, inactiveButtonClass) {
  // Функция декактивации кнопки Сохранить
  buttonElement.disabled = true
  buttonElement.classList.add(inactiveButtonClass)
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  // Функция отключение кнопки сохранения
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    deactivateSubmitBtn(buttonElement, inactiveButtonClass)
  } else {
    // иначе сделай кнопку активной
    activateSubmitBtn(buttonElement, inactiveButtonClass)
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

const runValidation = (formSelector, inputSelector, inputErrorClass, errorActiveClass) => {
  const form = document.querySelector(formSelector)
  form.querySelectorAll(inputSelector).forEach((inputElement) => {
    isValid(form, inputElement, inputErrorClass, errorActiveClass)
  })
}

function enableValidation (formSelector, inputSelector, submitButtonSelector,
                           inactiveButtonClass, inputErrorClass, errorActiveClass) {
  // Функция валидации форм
  document.querySelectorAll(formSelector).forEach((formElement) => {
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
  })
}

export  {enableValidation, deactivateSubmitBtn, runValidation}

