function add(num1, num2 = 0) {
    return num1 + num2;
}

function subtract(num1, num2 = 0) {
    return num1 - num2;
}

function multiply(num1, num2 = 1) {
    return num1 * num2;
}

function divide(num1, num2 = 1) {
    return num1 / num2;
}

const operate = function (operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'X':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return num1;
    }
}

function getKeyDigit(key, e) {
    temp += key.value;
    updateOperation(key.value);
}

function getOperator(operatorData, e) {
    if (firstNumber) {
        secondNumber = temp ? Number(temp) : 0;
        temp = '';
        result = operate(operator, firstNumber, secondNumber);
        displayOperation(result);
    } else {
        operator = operatorData.value;
        firstNumber = temp ? Number(temp) : 0;
        temp = '';
        displayOperation(`${firstNumber} ${operatorData.value} `);
    }
}

function updateOperation(str) {
    displayStr += str;
    displayCurrentOperation.textContent = displayStr;
}
function displayOperation(str) {
    displayStr = str;
    displayCurrentOperation.textContent = displayStr;
}


let displayStr = '';
let temp = '';
let operator = '';
let firstNumber = '';
let secondNumber = '';
let result = 0;

const displayCurrentOperation = document.querySelector('.input');
const keysNodeList = Array.from(document.querySelectorAll('.digit'));
const operatorsNodeList = Array.from(document.querySelectorAll('.calc'));
const prevResultsList = document.querySelector('.previousResults');

keysNodeList.forEach(key => key.addEventListener('click', e => getKeyDigit(key.dataset, e)));
operatorsNodeList.forEach(operator => operator.addEventListener('click', e => getOperator(operator.dataset, e)));