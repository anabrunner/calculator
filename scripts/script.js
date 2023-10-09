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
const operatorText = {
  "divide" : "÷",
  "multiply" : "×",
  "subtract" : "-",
  "add" : "+",
};
let num1 = 0;
let num2 = 0;
let operator = "";
let switchOperation = false;

numButtons.forEach(button => button.addEventListener("click", updateScreen));
clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", deleteInput);
divideButton.addEventListener("click", computeNum);
multiplyButton.addEventListener("click", computeNum);
subtractButton.addEventListener("click", computeNum);
addButton.addEventListener("click", computeNum);
equalButton.addEventListener("click", getResult);

function updateScreen() {
  if (!switchOperation) {
    currentScreen.innerText === "0" ? 
    currentScreen.innerText = this.id :
    currentScreen.innerText += this.id;
  } else {
    currentScreen.innerText = this.id;
    switchOperation = false;
  };
};

function clearScreen() { 
  currentScreen.innerText = "0";
  lastScreen.innerText = "";
};

function deleteInput() {
  currentScreen.innerText = currentScreen.innerText.slice(0, -1);
};

function computeNum() {
  operator = this.id;
  num1 = parseFloat(currentScreen.innerText);
  lastScreen.innerText = `${num1} ${operatorText[operator]}`;
  switchOperation = true;
};

function getResult() {
  num2 = parseFloat(currentScreen.innerText);
  lastScreen.innerText += ` ${num2} =`;
  switch (operator) {
    case "divide":
      divide(num1, num2);
      break;
    case "multiply":
      multiply(num1, num2);
      break;
    case "subtract":
      subtract(num1, num2);
      break;
    case "add":
      add(num1, num2);
      break;
  };
};

function divide(a, b) {
  currentScreen.innerText = String(a / b);
};

function multiply(a, b) {
  currentScreen.innerText = String(a * b);
};

function subtract(a, b) {
  currentScreen.innerText = String(a - b);
};

function add(a, b) {
  currentScreen.innerText = String(a + b);
};
