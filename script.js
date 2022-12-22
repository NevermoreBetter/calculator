class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.previousOperand = " ";
    this.currentOperand = "";
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand),
      current = parseFloat(this.currentOperand);

    if (isNaN(current) || isNaN(previous)) return;
    switch (this.operation) {
      case "+":
        computation = current + previous;
        break;
      case "-":
        computation = previous - current;
        break;
      case "x":
        computation = current * previous;
        break;
      case "/":
        computation = previous / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString(),
      integerDigits = parseFloat(stringNumber.split(".")[0]),
      decimalDigits = stringNumber.split(".")[1];
    let integerDispaly;
    if (isNaN(integerDigits)) {
      integerDispaly = "";
    } else {
      integerDispaly = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits) {
      return `${integerDispaly}.${decimalDigits}`;
    } else {
      return integerDispaly;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerHTML = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation) {
      this.previousOperandTextElement.innerHTML = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerHTML = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]"),
  operationButtons = document.querySelectorAll("[data-operation]"),
  equalsButton = document.querySelector("[data-equals]"),
  deleteButton = document.querySelector("[data-delete]"),
  allClearButton = document.querySelector("[data-all-clear]"),
  previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
  ),
  currentOperandTextElement = document.querySelector("[data-current-operand]"),
  style1 = document.getElementById("first"),
  style2 = document.getElementById("second"),
  style3 = document.getElementById("third"),
  body = document.querySelector("body"),
  headers = document.querySelector("header"),
  output = document.querySelector(".output"),
  keyboard = document.querySelector(".keyboard"),
  delButtons = document.querySelectorAll(".blue-btn"),
  numButtons = document.querySelectorAll(".white-btn"),
  slider = document.querySelector(".slider"),
  eqButtons = document.querySelector(".red-btn");

function changeStyle() {
  if (style1.checked) {
    body.style.backgroundColor = "var(--Very-dark-desaturated-blue-1)";
    headers.style.color = "var(--White)";
    output.style.backgroundColor = "var(--Very-dark-desaturated-blue-3)";
    output.style.color = "var(--White)";
    keyboard.style.backgroundColor = "var(--Very-dark-desaturated-blue-2)";

    delButtons.forEach((btn) => {
      btn.style.backgroundColor = "var(--Desaturated-dark-blue-1)";
      btn.style.boxShadow = "0 5px 0px var(--Desaturated-dark-blue-2)";
      btn.style.color = "var(--White)";
    });

    numButtons.forEach((btn) => {
      btn.style.backgroundColor = "var(--Light-grayish-orange)";
      btn.style.boxShadow = "0 5px 0px var(--Grayish-orange)";
      btn.style.color = "var(--Very-dark-grayish-blue)";
    });

    eqButtons.style.backgroundColor = "var(--Red)";
    eqButtons.style.boxShadow = "0 5px 0px var(--Dark-red)";
    eqButtons.style.color = "var(--White)";

    previousOperandTextElement.style.color = "rgba(255, 255, 255, 0.749)";
  } else if (style2.checked) {
    body.style.backgroundColor = "var(--Light-gray)";
    headers.style.color = "var(--Very-dark-grayish-yellow)";
    output.style.backgroundColor = "var(--Very-light-gray)";
    output.style.color = "var(--Very-dark-grayish-yellow)";
    keyboard.style.backgroundColor = "var(--Grayish-red)";

    delButtons.forEach((btn) => {
      btn.style.backgroundColor = "var(--Dark-moderate-cyan)";
      btn.style.boxShadow = "0 5px 0px var(--Very-dark-cyan)";
      btn.style.color = "var(--White)";
    });

    numButtons.forEach((btn) => {
      btn.style.backgroundColor = "var(--Light-grayish-yellow)";
      btn.style.boxShadow = "0 5px 0px var(--Dark-grayish-orange)";
      btn.style.color = "var(--Very-dark-grayish-yellow)";
    });

    eqButtons.style.backgroundColor = "var(--Orange)";
    eqButtons.style.boxShadow = "0 5px 0px var(--Dark-orange)";
    eqButtons.style.color = "var(--White)";

    previousOperandTextElement.style.color = "rgba(0, 0, 0, 0.55)";
  } else {
    body.style.backgroundColor = "var(--Very-dark-violet-1";
    headers.style.color = "var(--Light-yellow)";
    output.style.backgroundColor = "var(--Very-dark-violet-2)";
    output.style.color = "var(--Light-yellow)";
    keyboard.style.backgroundColor = "var(--Very-dark-violet-2)";

    delButtons.forEach((btn) => {
      btn.style.backgroundColor = "var(--Dark-violet)";
      btn.style.boxShadow = "0 5px 0px var(--Vivid-magenta)";
      btn.style.color = "var(--White)";
    });

    numButtons.forEach((btn) => {
      btn.style.backgroundColor = "var(--Very-dark-violet)";
      btn.style.boxShadow = "0 5px 0px var(--Dark-magenta)";
      btn.style.color = "var(--Light-yellow)";
    });

    eqButtons.style.backgroundColor = "var(--Pure-cyan)";
    eqButtons.style.boxShadow = "0 5px 0px var(--Soft-cyan)";
    eqButtons.style.color = "var(--White)";

    previousOperandTextElement.style.color = "rgb(124, 116, 0)";
  }
}

let calculator = new Calculator(
  currentOperandTextElement,
  previousOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

style1.addEventListener("change", changeStyle);
style2.addEventListener("change", changeStyle);
style3.addEventListener("change", changeStyle);
