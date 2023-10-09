// JavaScript for Calculator

const lastScreen = document.getElementById("lastScreen");
const currentScreen = document.getElementById("currentScreen");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const decimalButton = document.getElementById(".");
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
  "equal" : "=",
};
let num1 = 0;
let num2 = 0;
let result = 0;
let operator = "";
let switchOperation = false;
let decimal = false;
let updateResult = false;
let restart = false;

numButtons.forEach(button => button.addEventListener("click", updateScreen));
clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", deleteInput);
decimalButton.addEventListener("click", addDecimal);
divideButton.addEventListener("click", computeNum);
multiplyButton.addEventListener("click", computeNum);
subtractButton.addEventListener("click", computeNum);
addButton.addEventListener("click", computeNum);
equalButton.addEventListener("click", computeResult);
window.addEventListener("keydown", keyboardInput);

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) document.getElementById(e.key).click();
  if (e.key === "Escape") clearButton.click();
  if (e.key === "Backspace") deleteButton.click();
  if (e.key === ".") decimalButton.click();
  if (e.key === "/") divideButton.click();
  if (e.key === "*") multiplyButton.click();
  if (e.key === "-") subtractButton.click();
  if (e.key === "+") addButton.click();
  if (e.key === "=" || e.key === "Enter") equalButton.click();
};

function updateScreen() {
  if (restart) {
    clearScreen();
  };
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
  num1 = 0;
  num2 = 0;
  result = 0;
  operator = "";
  switchOperation = false;
  decimal = false;
  updateResult = false;
  restart = false;
};

function deleteInput() {
  currentScreen.innerText = currentScreen.innerText.slice(0, -1);
};

function addDecimal() {
  if (!decimal) {
    currentScreen.innerText += ".";
    decimal = true;
  } else {
    return;
  };
};

function computeNum() {
  if (switchOperation && !restart) return;
  num1 = parseFloat(currentScreen.innerText);
  if (updateResult) {
    if (restart) {
      operator = this.id;
      lastScreen.innerText = ` ${num1} ${operatorText[operator]}`;
      restart = false;
    } else {
      result = getResult();
      operator = this.id;
      lastScreen.innerText += ` ${num1} ${operatorText[operator]}`;
      currentScreen.innerText = String(result);
    };
  } else {
    result = num1;
    operator = this.id;
    lastScreen.innerText += ` ${num1} ${operatorText[operator]}`;
    currentScreen.innerText = String(result);
  };
  num2 = result;
  switchOperation = true;
  updateResult = true;
  decimal = false;
};

function computeResult() {
  if (restart || switchOperation || !updateResult) return;
  num1 = parseFloat(currentScreen.innerText);
  result = getResult();
  operator = this.id;
  lastScreen.innerText += ` ${num1} ${operatorText[operator]}`;
  currentScreen.innerText = String(result);
  num2 = result;
  switchOperation = true;
  updateResult = true;
  restart = true;
  decimal = false;
};

function getResult() {
  switch (operator) {
    case "divide":
      return divide(num2, num1);
    case "multiply":
      return multiply(num1, num2);
    case "subtract":
      return subtract(num2, num1);
    case "add":
      return add(num1, num2);
  };
};

function divide(a, b) {
  if (b == "0") {
    alert("Attempting to divide by zero may rip a hole in the fabric of space-time. Please press 'Clear' to continue.");
    return 0;
  };
  return a / b;
};

function multiply(a, b) {
  return a * b;
};

function subtract(a, b) {
  return a - b;
};

function add(a, b) {
  return a + b;
};
