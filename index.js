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
        case 'x':
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
        operator2 = operatorData.value;
        secondNumber = temp ? Number(temp) : 0;
        result = operate(operator, firstNumber, secondNumber);
        saveOperation(displayStr, result);
        displayOperation(result);
        prepareNextOperation(operator2);
    } else {
        operator = operatorData.value;
        firstNumber = temp ? Number(temp) : 0;
        temp = '';
        displayOperation(`${firstNumber} ${operatorData.value} `);
    }
}

function getFunction(functionData, e) {
    switch (functionData.value) {
        case 'CLR':
            prevResultsList.innerHTML = '';
            resetVariables();
            break;
        case 'DEL':
            resetVariables();
            break;
    }
}

function resetVariables() {
    displayStr = '';
    temp = '';
    operator = '';
    operator2 = '';
    firstNumber = '';
    secondNumber = '';
    result = 0;
    displayCurrentOperation.textContent = '\u00a0';
}

function updateOperation(str) {
    displayStr += str;
    displayCurrentOperation.textContent = displayStr;
}
function displayOperation(str) {
    displayStr = str;
    displayCurrentOperation.textContent = displayStr;
}

function prepareNextOperation(nextOperator) {
    if (nextOperator == '=') {
        temp = '';
        operator = '';
        firstNumber = '';
        displayStr = '';
    } else {
        temp = '';
        firstNumber = result;
        operator = nextOperator;
        displayOperation(`${firstNumber} ${operator} `);
    }
}

function saveOperation(operation, result) {
    if (prevResultsList.childNodes.length > 4) removeOldestOperation();
    const latestOperation = document.createElement('div');
    latestOperation.classList.add('previous');

    const operationElement = document.createElement('div');
    operationElement.classList.add('operationBody');
    operationElement.textContent = `${operation} =`;

    const resultElement = document.createElement('div');
    resultElement.classList.add('resultBody');
    resultElement.textContent = result;

    latestOperation.appendChild(operationElement);
    latestOperation.appendChild(resultElement);
    prevResultsList.appendChild(latestOperation);
}

function removeOldestOperation() {
    prevResultsList.removeChild(prevResultsList.firstChild);
}

let displayStr = '';
let temp = '';
let operator = '';
let operator2 = '';
let firstNumber = '';
let secondNumber = '';
let result = 0;

const displayCurrentOperation = document.querySelector('.input');
const keysNodeList = Array.from(document.querySelectorAll('.digit'));
const operatorsNodeList = Array.from(document.querySelectorAll('.calc'));
const keyFnNodeList = Array.from(document.querySelectorAll('.function'));
const prevResultsList = document.querySelector('.previousResults');

keysNodeList.forEach(key => key.addEventListener('click', e => getKeyDigit(key.dataset, e)));
operatorsNodeList.forEach(operator => operator.addEventListener('click', e => getOperator(operator.dataset, e)));
keyFnNodeList.forEach(fnKey => fnKey.addEventListener('click', e => getFunction(fnKey.dataset, e)));