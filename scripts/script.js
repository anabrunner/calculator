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

function updateScreen() {
  currentScreen.innerText += this.id;
};
