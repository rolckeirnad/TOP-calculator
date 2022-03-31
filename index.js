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

function roundDecimals(value, decimals = 4) {
    if (!isFinite(value)) return value;
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function getOperand(key, e) {
    if (key.value === '.') {
        if (hasDecimal) return;
        else hasDecimal = true;
    }
    if (temp.length < 15) {
        temp += key.value;
        updateOperation(key.value);
    }
}

function getOperator(operatorData, e) {
    //We have a number from past operation but we digit a different number to 
    //operate, so replace it with the new one before get operator
    if (firstNumber !== '' && temp && !operator && operatorData.value != '=') {
        firstNumber = temp === '.' ? 0 : roundDecimals(Number(temp));
        temp = '';
        hasDecimal = false;
        operator = operatorData.value;
        displayOperation(`${firstNumber} ${operator} `);
    }
    // If we digit another operator when already have an operator before digit the second number,
    // replace the previous with the new one
    if (firstNumber !== '' && !temp && operatorData.value != '=') {
        operator = operatorData.value;
        displayOperation(`${firstNumber} ${operator} `);
    }
    //Get second number from temp
    if (firstNumber !== '' && temp && operator) {
        secondNumber = temp === '.' ? 0 : roundDecimals(Number(temp));
        temp = '';
        hasDecimal = false;
        displayOperation(`${firstNumber} ${operator} ${secondNumber}`);
    }
    //Get first number from temp
    if (!firstNumber && temp && operatorData.value != '=') {
        firstNumber = temp === '.' ? 0 : roundDecimals(Number(temp));
        temp = '';
        hasDecimal = false;
        operator = operatorData.value;
        displayOperation(`${firstNumber} ${operator} `);
    }
    //Operate if we have two numbers
    if (firstNumber !== '' && secondNumber !== '') {
        result = roundDecimals(operate(operator, firstNumber, secondNumber));
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
    hasDecimal = false;
    operator = '';
    firstNumber = '';
    secondNumber = '';
    result = '';
    displayElement.textContent = '\u00a0';
}

function updateOperation(str) {
    displayStr += str;
    displayElement.textContent = displayStr;
}
function displayOperation(str) {
    displayStr = str;
    displayElement.textContent = displayStr;
}

function prepareNextOperation(operatorValue) {
    if (operatorValue == '=') {
        temp = '';
        hasDecimal = false;
        firstNumber = result;
        secondNumber = '';
        result = '';
        operator = '';
        displayStr = '';
    } else {
        temp = '';
        hasDecimal = false;
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
let hasDecimal = false;

const displayCurrentOperation = document.querySelector('.input');
const displayElement = document.createElement('span');
displayElement.classList.add('inputText');
displayElement.textContent = '\u00a0';
displayCurrentOperation.append(displayElement);

const keysNodeList = Array.from(document.querySelectorAll('.digit'));
const operatorsNodeList = Array.from(document.querySelectorAll('.calc'));
const keyFnNodeList = Array.from(document.querySelectorAll('.function'));
const prevResultsList = document.querySelector('.previousResults');

keysNodeList.forEach(key => key.addEventListener('click', e => getOperand(key.dataset, e)));
operatorsNodeList.forEach(operator => operator.addEventListener('click', e => getOperator(operator.dataset, e)));
keyFnNodeList.forEach(fnKey => fnKey.addEventListener('click', e => getFunction(fnKey.dataset, e)));