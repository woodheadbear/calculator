let display = document.querySelector(".display");
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
    } else if (event.target.closest(".equals")) {
        const equals = event.target.closest(".equals");
        if (!equals) return;

        if (firstNum && secondNum && operator) {
            firstNum = operate(operator, firstNum, secondNum);
            display.textContent = firstNum;
            secondNum = "";
            operator = '';
        }
    } else if (event.target.closest(".clear")) {
        const clear = event.target.closest(".clear");
        if (!clear) return;

        firstNum = "";
        secondNum = "";
        operator = "";
        display.textContent = 0;
    } else if (event.target.closest(".decimal")) {
        const decimal = event.target.closest(".decimal");
        if (!decimal) return;

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
        return showError();

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

    if (!(operator in operations)) return showError();

    return operations[operator](num1, num2);
}

function showError() {
    firstNum = "";
    secondNum = "";
    operator = "";
    return display.textContent = "ERROR";

}