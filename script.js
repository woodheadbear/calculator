const DISPLAY_CAPACITY = 9;

let display = document.querySelector(".display");
const container = document.querySelector(".buttons-container");
const buttons = container.querySelectorAll("button");
const listOfButtons = Array.from(buttons);
let firstTimeCalculation = true;

let firstNum = "";
let secondNum = "";
let operator = "";

document.addEventListener("keydown", (event) => {
    let keyName = event.key;
    if (keyName === "Enter") {
        keyName = "=";
    } else if (keyName === "Backspace") {
        keyName = "←";
    } else if (keyName === "Escape") {
        keyName = "Clear";
    }

    let pressedButton = listOfButtons.find(item => item.textContent.includes(keyName));
    if (pressedButton) pressedButton.click();
});

container.addEventListener("click", (event) => {
    if (event.target.closest(".digit")) {
        const digit = event.target.closest(".digit");

        if (firstNum && operator) {
            secondNum = checkNumLength(secondNum, digit);
            display.textContent = secondNum;
        } else if (firstTimeCalculation) {
            firstNum = checkNumLength(firstNum, digit);
            display.textContent = firstNum;
        } else {
            firstNum = checkNumLength("", digit);
            display.textContent = firstNum;
            firstTimeCalculation = true;
        }

    } else if (event.target.closest(".operator")) {
        const operatorButton = event.target.closest(".operator");

        if (firstNum && secondNum) {
            firstNum = operate(operator, firstNum, secondNum);
            errorHandler(firstNum);
            operator = operatorButton.textContent;
            secondNum = "";
        } else if (firstNum) {
            operator = operatorButton.textContent;
        }

    } else if (event.target.closest(".equals")) {
        if (firstNum && secondNum && operator) {
            firstNum = operate(operator, firstNum, secondNum);
            errorHandler(firstNum);
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
                if (!secondNum) secondNum = "0";
                secondNum = checkNumLength(secondNum, decimal);
                display.textContent = secondNum;
            }
        } else if (firstTimeCalculation) {
            if (!firstNum.includes(decimal.textContent)) {
                if (!firstNum) firstNum = "0";
                firstNum = checkNumLength(firstNum, decimal);
                display.textContent = firstNum;
            }
        } else {
            if (!firstNum.includes(decimal.textContent)) {
                firstNum = "0";
                firstNum = checkNumLength(firstNum, decimal);
                display.textContent = firstNum;
                firstTimeCalculation = true;
            }
        }
    } else if (event.target.closest(".backspace")) {
        if (firstNum && operator) {
            if (secondNum) {
                secondNum = removeLastDigit(secondNum);
                display.textContent = secondNum ? secondNum : "0";
            }

        } else if (firstTimeCalculation) {
            if (firstNum) {
                firstNum = removeLastDigit(firstNum);
                display.textContent = firstNum ? firstNum : "0";
            }

        };
    }
});

function add(num1, num2) {
    const result = Number(num1) + Number(num2);

    return toRoundNum(result);
};

function subtract(num1, num2) {
    const result = Number(num1) - Number(num2);
    return toRoundNum(result);
};

function multiply(num1, num2) {
    const result = (Number(num1) * Number(num2));

    return toRoundNum(result);

};

function divide(num1, num2) {
    if (Number(num2) === 0) {
        return "ERROR";
    }

    const result = Number(num1) / Number(num2);

    return toRoundNum(result);
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

function toRoundNum(num) {
    return String(parseFloat(num.toFixed(5)));
}

function errorHandler(num) {
    if (num.length > DISPLAY_CAPACITY) {
        num = "LONGOUTPUT";
    }
    display.textContent = num;

    if (num === "ERROR" || num === "LONGOUTPUT") {
        firstNum = "";
    }
}

function checkNumLength(num, button) {
    if (num === "LONGINPUT") {
        return button.textContent;
    } else if (num.length < DISPLAY_CAPACITY) {
        return num += button.textContent;
    } else {
        return "LONGINPUT";
    }
}

function removeLastDigit(num) {
    return num.slice(0, -1);
}

