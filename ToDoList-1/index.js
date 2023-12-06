const inputElement = document.querySelector(".task-input");
const button = document.querySelector(".new-task-button");

const validateInput = () => inputElement.value.trim().length > 0;

function handleAddTask() {
  let inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }
}

function handleInputChange() {
  let inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
}



button.addEventListener("click", () => handleAddTask());
inputElement.addEventListener('change', ()=> handleInputChange())


