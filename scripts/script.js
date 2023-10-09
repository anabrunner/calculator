// JavaScript for Calculator

const lastScreen = document.getElementById("lastScreen");
const currentScreen = document.getElementById("currentScreen");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const subtractButton = document.getElementById("subtract");
const addButton = document.getElementById("add");
const equalButton = document.getElementById("equal");
const numButtons = document.querySelectorAll(".buttons > .btn.num");

numButtons.forEach((button) => {
  button.addEventListener("click", updateScreen)
});

clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", deleteInput);

function updateScreen() {
  currentScreen.innerText === "0" ? 
    currentScreen.innerText = this.id :
    currentScreen.innerText += this.id;
};

function clearScreen() { 
  currentScreen.innerText = "0";
};

function deleteInput() {
  currentScreen.innerText = currentScreen.innerText.slice(0,-1);
};