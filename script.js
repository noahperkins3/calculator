const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const negateButton = document.querySelector(".negate");
const display = document.querySelector("#display");
const backspaceButton = document.querySelector(".backspace");
const nameButton = document.querySelector("#nameChange");
const piButton = document.querySelector("#pi");
const trigOperators = document.querySelectorAll(".trig");

class Calculator {
  currentNumber = "";
  previousNumber = "";
  result = "";
  currentOperator = "";
  negated = false;
  equalsPressed = false;

  constructor() {}

  appendNumber(number) {
    if (this.equalsPressed) {
      this.currentNumber = "";
      this.equalsPressed = false;
    }
    if (this.currentNumber.length < 9) {
      this.currentNumber += number;
    }
  }

  negate() {
    if (this.currentNumber != "") {
      if (!this.negated) {
        this.currentNumber = "-" + this.currentNumber;
        this.negated = true;
        return;
      } else {
        this.currentNumber = this.currentNumber.substring(
          1,
          this.currentNumber.length
        );
        this.negated = false;
      }
    }
  }

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
  }

  setEqualsPressed() {
    this.equalsPressed = true;
  }

  compute() {
    if (this.currentOperator == "+") {
      this.currentNumber =
        Number(this.currentNumber) + Number(this.previousNumber);
    } else if (this.currentOperator == "/") {
      this.currentNumber =
        Number(this.previousNumber) / Number(this.currentNumber);
    } else if (this.currentOperator == "x") {
      this.currentNumber =
        Number(this.previousNumber) * Number(this.currentNumber);
    } else if (this.currentOperator == "-") {
      this.currentNumber =
        Number(this.previousNumber) - Number(this.currentNumber);
    }
  }

  chooseOperator(operator) {
    this.compute();
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
    this.currentOperator = operator;
  }

  backSpace() {
    this.currentNumber = this.currentNumber.substring(
      0,
      this.currentNumber.length - 1
    );
  }

  updateDisplay() {
    let result = String(this.currentNumber);
    if (result.length > 9) {
      result = result.substring(0, 9);
    }
    display.innerHTML = result;
  }
}

const calculator = new Calculator("Noah");

piButton.addEventListener("click", () => {
  calculator.appendNumber("3.1415926");
  calculator.updateDisplay();
});

backspaceButton.addEventListener("click", () => {
  calculator.backSpace();
  calculator.updateDisplay();
});

negateButton.addEventListener("click", () => {
  calculator.negate();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.setEqualsPressed();
  calculator.compute();
  calculator.updateDisplay();
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerHTML);
    calculator.updateDisplay();
  });
});
