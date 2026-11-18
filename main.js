const digitBtn = document.querySelectorAll(".digit");
const display = document.querySelector("#display");
const clearBtn = document.querySelector(".clear");
const operatorBtn = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const decimalBtn = document.querySelector(".decimal");
const deleteBtn = document.querySelector(".delete");

function add(val1, val2) {
  return val1 + val2;
}

function subtract(val1, val2) {
  return val1 - val2;
}

function multiply(val1, val2) {
  return val1 * val2;
}

function divide(val1, val2) {
  return val1 / val2;
}

let firstOperand = "";
let secondOperand = "";
let currentOperand = "first";
let currentOperator = "first";
let resultDisplayed = false;
let operator = "";

function operate(val1, oprtr, val2) {
  switch (oprtr) {
    case "+":
      display.value = Math.round(add(val1, val2) * 10) / 10;
      break;

    case "-":
      display.value = Math.round(subtract(val1, val2) * 10) / 10;
      break;

    case "*":
      display.value = Math.round(multiply(val1, val2) * 10) / 10;
      break;

    case "/":
      if (val2 !== 0) {
        display.value = Math.round(divide(val1, val2) * 10) / 10;
      } else {
        display.value = "Error 404. Logic not found.";
      }
      break;
  }

  firstOperand = Number(display.value);
  secondOperand = "";
  operator = "";
}

clearBtn.addEventListener("click", () => {
  firstOperand = "";
  secondOperand = "";
  currentOperand = "first";
  currentOperator = "first";
  resultDisplayed = false;
  operator = "";
  display.value = "";
});

digitBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (resultDisplayed && operator === "") {
      firstOperand = "";
      secondOperand = "";
      currentOperand = "first";
      currentOperator = "first";
      resultDisplayed = false;
      operator = "";
      display.value = "";

      if (currentOperand === "first") {
        firstOperand += btn.textContent;
        display.value = `${firstOperand}`;
      } else {
        secondOperand += btn.textContent;
        display.value = `${firstOperand} ${operator} ${secondOperand}`;
      }
    } else {
      if (currentOperand === "first") {
        firstOperand += btn.textContent;
        display.value = `${firstOperand}`;
      } else {
        secondOperand += btn.textContent;
        display.value = `${firstOperand} ${operator} ${secondOperand}`;
      }
    }
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentOperator === "first") {
      operator = btn.textContent;
      display.value = `${firstOperand} ${operator}`;
      currentOperand = "second";
      currentOperator = "second";
    } else {
      firstOperand = Number(firstOperand);
      secondOperand = Number(secondOperand);
      operate(firstOperand, operator, secondOperand);
      operator = btn.textContent;
      display.value = `${firstOperand} ${operator}`;
    }
  });
});

equalBtn.addEventListener("click", () => {
  if (!(firstOperand === "" || operator === "" || secondOperand === "")) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    operate(firstOperand, operator, secondOperand);
    resultDisplayed = true;
  } else {
    display.value = "Expression not found!";
  }
});

decimalBtn.addEventListener("click", () => {
  if (currentOperand === "first") {
    if (!firstOperand.includes(".")) {
      firstOperand += decimalBtn.textContent;
      display.value = `${firstOperand}`;
    }
  } else {
    if (!secondOperand.includes(".")) {
      secondOperand += decimalBtn.textContent;
      display.value = `${firstOperand} ${operator} ${secondOperand}`;
    }
  }
});

deleteBtn.addEventListener("click", () => {
  if (currentOperand === "first") {
    firstOperand = firstOperand.slice(0, -1);
    display.value = firstOperand;
  } else {
    if (currentOperand === "second" && secondOperand === "") {
      operator = operator.slice(0, -1);
      currentOperand = "first";
      currentOperator = "first";
    }
    secondOperand = secondOperand.slice(0, -1);
    display.value = `${firstOperand} ${operator} ${secondOperand}`;
  }
});

document.addEventListener("keydown", (event) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = ["-", "+", "*", "/"];
  const calculate = ["Enter", "="];
  const del = "Backspace";
  const clear = "Escape";
  let eKey = event.key;

  if (digits.includes(event.key)) {
    let digit = [...digitBtn].find((element) => element.textContent === eKey);
    digit.click();
  } else if (operators.includes(event.key)) {
    let operator = [...operatorBtn].find(
      (element) => element.textContent === eKey,
    );
    operator.click();
  } else if (calculate.includes(event.key)) {
    equalBtn.click();
  } else if (del === event.key) {
    deleteBtn.click();
  } else if (clear === event.key) {
    clearBtn.click();
  }
});
