let display = document.querySelector(".display");
const allDigits = document.querySelectorAll(".digit");
const allOperators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");

const container = document.querySelector(".buttons-container");

let firstNum = "";
let secondNum = "";
let operator = "";

container.addEventListener("click", (event) => {

    if (event.target.closest(".digit")) {
        const digit = event.target.closest(".digit");
        if (!digit) return;

        if (firstNum && operator) {
            secondNum += digit.textContent;
            display.textContent = secondNum;

            console.log(firstNum, secondNum, operator);
        } else {
            firstNum += digit.textContent;
            display.textContent = firstNum;

            console.log(firstNum, secondNum, operator);
        }
    } else if (event.target.closest(".operator")) {
        const operatorButton = event.target.closest(".operator");
        if (!operatorButton) return;

        if (firstNum && secondNum) {
            firstNum = operate(operator, firstNum, secondNum);
            display.textContent = firstNum;
            operator = operatorButton.textContent;

            secondNum = "";

            console.log(firstNum, secondNum, operator);
        } else if (firstNum) {
            operator = operatorButton.textContent;

            console.log(firstNum, secondNum, operator);
        }
    };
});

function add(num1, num2) {

    return Number(num1) + Number(num2);
};

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
};

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
};

function divide(num1, num2) {
    if (Number(num2) === 0) {
        return "Error: Division by zero is not allowed.";
    }
    return Number(num1) / Number(num2);
};

function operate(operator, num1, num2) {
    const operations = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide
    };

    if (!(operator in operations)) return "ERROR";

    return operations[operator](num1, num2);
}
