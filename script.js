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
        } else if (firstTimeCalculation) {
            firstNum += digit.textContent;
            display.textContent = firstNum;
        } else {
            firstNum = digit.textContent;
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
                secondNum += decimal.textContent;
                display.textContent = secondNum;
            }
        } else if (firstTimeCalculation) {
            if (!firstNum.includes(decimal.textContent)) {
                if (!firstNum) firstNum = "0";
                firstNum += decimal.textContent;
                display.textContent = firstNum;
            }
        } else {
            if (!firstNum.includes(decimal.textContent)) {
                firstNum = "0";
                firstNum += decimal.textContent;
                display.textContent = firstNum;
                firstTimeCalculation = true;
            }
        }
    };
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
    display.textContent = num;

    if (num === "ERROR") {
        firstNum = "";
    }
}