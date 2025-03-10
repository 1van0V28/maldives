const getFormFields = function() {
    const form = document.querySelector("form")
    const formData = new FormData(form)

    return formData
}


const isFormFulfilled = function(formData) {
    for (const fieldName of formData.keys()) {
        const field = document.querySelector(`[name=${fieldName}]`)
        if (fieldName !== "personal_data" && !field.value) {
            return false
        } else if (fieldName === "personal_data" && !field.checked) {
            return false
        }
    }

    return true
}


const handleCheckboxChange = function(checkbox, formData, submitButton) {
    if (checkbox.checked && isFormFulfilled(formData)) {
        submitButton.classList.add("form__button_submit--active")
    } else {
        submitButton.classList.remove("form__button_submit--active")
    }

    formData[checkbox.name] = checkbox.checked
}


const handleInputFieldChange = function(inputField, formData, submitButton) {
    if (inputField.value) {
        inputField.classList.add("form__input--active")
        
        if (isFormFulfilled(formData)) {
            submitButton.classList.add("form__button_submit--active")
        }
    } else {
        inputField.classList.remove("form__input--active")
        submitButton.classList.remove("form__button_submit--active")
    }

    formData[inputField.name] = inputField.value
}


const handleInputChange = function(event, formData) {
    const submitButton = document.querySelector("[type=submit]")
    const inputElement = event.target
    if (inputElement.name === "personal_data") {
        handleCheckboxChange(inputElement, formData, submitButton)
    } else {
        handleInputFieldChange(inputElement, formData, submitButton)
    }
}


const addInputActions = function(formData) {
    formData.keys().forEach((fieldName) => {
        const field = document.querySelector(`[name=${fieldName}]`)
        field.addEventListener("change", (event) => {handleInputChange(event, formData)})
    })

    const personalDataCheckbox = document.querySelector("#personal_data")
    personalDataCheckbox.addEventListener("change", (event) => {handleInputChange(event, formData)})
    formData.append(personalDataCheckbox.name, personalDataCheckbox.checked)
}


const formData = getFormFields()
addInputActions(formData)