let firstNum = 0;
let secondNum = 0;
let operator = "";



function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    if (num2 === 0) {
        return "Error: Division by zero is not allowed.";
    }
    return num1 / num2;
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

console.log(operate("@", 5, 3));
console.log(operate("-", 3, 4));
