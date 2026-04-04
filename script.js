let display = document.querySelector(".display");
const container = document.querySelector(".buttons-container");
let firstTimeCalculation = true;

let firstNum = "";
let secondNum = "";
let operator = "";

container.addEventListener("click", (event) => {

    if (event.target.closest(".digit")) {
        const digit = event.target.closest(".digit");

        if (firstNum && operator) {
            secondNum += digit.textContent;
            display.textContent = secondNum;

            console.log(firstNum, secondNum, operator);
        } else if (firstTimeCalculation) {
            firstNum += digit.textContent;
            display.textContent = firstNum;

            console.log(firstNum, secondNum, operator);
        } else {
            firstNum = "";
            firstNum += digit.textContent;
            display.textContent = firstNum;
        }
    } else if (event.target.closest(".operator")) {
        const operatorButton = event.target.closest(".operator");

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
    } else if (event.target.closest(".equals")) {
        if (firstNum && secondNum && operator) {
            firstNum = operate(operator, firstNum, secondNum);
            display.textContent = firstNum;
            secondNum = "";
            operator = "";
            firstTimeCalculation = false;
        }
    } else if (event.target.closest(".clear")) {
        firstNum = "";
        secondNum = "";
        operator = "";
        display.textContent = 0;
        firstTimeCalculation = true;
    } else if (event.target.closest(".decimal")) {
        const decimal = event.target.closest(".decimal");

        if (firstNum && operator) {
            if (!secondNum.includes(decimal.textContent)) {
                secondNum += decimal.textContent;
                display.textContent = secondNum;

                console.log(firstNum, secondNum, operator);
            }

        } else {
            if (!firstNum.includes(decimal.textContent)) {
                firstNum += decimal.textContent;
                display.textContent = firstNum;

                console.log(firstNum, secondNum, operator);
            }
        }
    };
});

function add(num1, num2) {

    return `${Number(num1) + Number(num2)}`;
};

function subtract(num1, num2) {
    return `${Number(num1) - Number(num2)}`;
};

function multiply(num1, num2) {
    return `${Number(num1) * Number(num2)}`;
};

function divide(num1, num2) {
    if (Number(num2) === 0) {
        display.textContent = "ERROR";
        return "";
    }
    return `${Number(num1) / Number(num2)}`;
};

function operate(operator, num1, num2) {
    const operations = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide
    };

    if (!(operator in operations)) {
        display.textContent = "ERROR";
        return "";
    }
    return operations[operator](num1, num2);
}