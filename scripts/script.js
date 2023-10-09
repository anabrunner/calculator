// JavaScript for Calculator

// DOM elements
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
// Text for each operator
const operatorText = {
  "divide" : "÷",
  "multiply" : "×",
  "subtract" : "-",
  "add" : "+",
  "equal" : "=",
};
// Numbers, result, and operator to be stored while doing operations
let num1 = 0;
let num2 = 0;
let result = 0;
let operator = "";
// Toggles between appending numbers or starting new number
let switchOperation = false;
// Toggles to allow decimal button to be pushed or not
let decimal = false;
// Toggles between initial number insertion and appending result
let updateResult = false;
// Toggles between starting fresh after pushing equal sign or appending operations
let restart = false;

// Add event listeners
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

// Keyboard strokes are mapped to the UI buttons
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

// Updates screen with numbers pushed
function updateScreen() {
  if (restart) {
    // Resets screen if equal sign was pushed
    clearScreen();
  };
  if (!switchOperation) {
    // Appends numbers
    currentScreen.innerText === "0" ? 
    currentScreen.innerText = this.id :
    currentScreen.innerText += this.id;
  } else {
    // Replaces numbers
    currentScreen.innerText = this.id;
    switchOperation = false;
  };
};

// Resets all variables to initial state
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

// Deletes last input
function deleteInput() {
  currentScreen.innerText = currentScreen.innerText.slice(0, -1);
};

// Function toggles decimal variable to prevent multiple decimal places being added to one number
function addDecimal() {
  if (!decimal) {
    currentScreen.innerText += ".";
    decimal = true;
  } else {
    return;
  };
};

// Computes result so far
function computeNum() {
  // Prevents an operator button being pushed multiple times in a row with no numbers between
  if (switchOperation && !restart) return;
  num1 = parseFloat(currentScreen.innerText);
  // Checks if this is the initial number or the continuation of an operation
  if (updateResult) {
    // Checks if this is continuing from a result after equals was pushed
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
    // If this is initial number to be calculated does not run results function
    result = num1;
    operator = this.id;
    lastScreen.innerText += ` ${num1} ${operatorText[operator]}`;
    currentScreen.innerText = String(result);
  };
  // Updates number and toggle variables
  num2 = result;
  switchOperation = true;
  updateResult = true;
  decimal = false;
};

// Computes final result
function computeResult() {
  // Prevents equals being pushed multiple times or before any number is added
  if (restart || switchOperation || !updateResult) return;
  num1 = parseFloat(currentScreen.innerText);
  result = getResult();
  operator = this.id;
  lastScreen.innerText += ` ${num1} ${operatorText[operator]}`;
  currentScreen.innerText = String(result);
  // Updates number and toggle variables
  num2 = result;
  switchOperation = true;
  updateResult = true;
  restart = true;
  decimal = false;
};

// Gets result by running math function based on operator
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

// Math functions
function divide(a, b) {
  // Outputs alert if user attempts to divide by zero
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
