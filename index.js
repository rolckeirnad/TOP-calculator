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

function getOperand(key, e) {
    temp += key.value;
    updateOperation(key.value);
}

function getOperator(operatorData, e) {
    if (firstNumber && temp && !operator && operatorData.value != '=') {
        firstNumber = Number(temp);
        temp = '';
        operator = operatorData.value;
        displayOperation(`${firstNumber} ${operator} `);
    }
    if (firstNumber && !temp && operatorData.value != '=') {
        operator = operatorData.value;
        displayOperation(`${firstNumber} ${operator} `);
    }
    if (firstNumber && temp && operator) {
        secondNumber = Number(temp);
        temp = '';
        displayOperation(`${firstNumber} ${operator} ${secondNumber}`);
    }
    if (!firstNumber && temp && operatorData.value != '=') {
        firstNumber = Number(temp);
        temp = '';
        operator = operatorData.value;
        displayOperation(`${firstNumber} ${operator} `);
    }
    if (firstNumber && secondNumber) {
        result = operate(operator, firstNumber, secondNumber);
        saveOperation(displayStr, result);
        displayOperation(result);
        prepareNextOperation(operatorData.value);
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
    firstNumber = '';
    secondNumber = '';
    result = '';
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

function prepareNextOperation(operatorValue) {
    if (operatorValue == '=') {
        temp = '';
        firstNumber = result;
        secondNumber = '';
        result = '';
        operator = '';
        displayStr = '';
    } else {
        temp = '';
        firstNumber = result;
        secondNumber = '';
        result = '';
        operator = operatorValue;
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
let firstNumber = '';
let secondNumber = '';
let result = '';

const displayCurrentOperation = document.querySelector('.input');
const keysNodeList = Array.from(document.querySelectorAll('.digit'));
const operatorsNodeList = Array.from(document.querySelectorAll('.calc'));
const keyFnNodeList = Array.from(document.querySelectorAll('.function'));
const prevResultsList = document.querySelector('.previousResults');

keysNodeList.forEach(key => key.addEventListener('click', e => getOperand(key.dataset, e)));
operatorsNodeList.forEach(operator => operator.addEventListener('click', e => getOperator(operator.dataset, e)));
keyFnNodeList.forEach(fnKey => fnKey.addEventListener('click', e => getFunction(fnKey.dataset, e)));